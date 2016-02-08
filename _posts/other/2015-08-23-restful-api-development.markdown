---
layout: post
title:  "RESTful API开发所思"
date:   2015-08-23 22:39:32
author: 吴珂皓
categories: other
keywords: 谷歌代码规范,JSON风格指南,RESTful,json,开发,代码风格
excerpt: 谷歌代码规范 RESTful API开发
---
> 未尽事项请参考：[谷歌代码规范 JSON风格指南](http://blog.how-to-code.info/restful/google-style-guide-JSON-Style-Guide.html)

##API规范
本规范将在如下几个方面对API开发进行描述：

1. API定义

2. URL格式

3. URL路由配置

4. API请求数据格式

5. API返回数据格式

6. API权限控制

### API职责

API定义为在python-tornado框架下开发的RESTful风格用于连接客户端与数据库的结构化JSON数据接口，并负责数据权限控制。

### URL格式

1. URL格式原则上遵循RESTful风格。

2. API使用api.xxx.xxx二级域名。

3. 用路径表示一种资源，路径中的字符用名词进行描述，原则上采用名词复数进行描述。

4. HTTP动词包括：GET、POST、PUT、PATCH和DELETE，分别对应句柄中的GET、POST、PUT、PATCH和DELETE方法。

5. 示例：

>
    GET api.xxx.xxx/categories:列出所有分类
    POST api.xxx.xxx/categories:创建一个新的分类
    GET api.xxx.xxx/categories/ID:获取指定分类的信息
    PUT api.xxx.xxx/categories/ID:更新指定分类的信息（提供指定分类的全部信息）
    PATCH api.xxx.xxx/categories/ID:更新指定分类的信息（提供指定分类的全部信息）
    DELETE api.xxx.xxx/categories/ID:删除某指定分类
    GET api.xxx.xxx/categories/ID/courses:列出某个指定分类下的所有课程
    DELETE api.xxx.xxx/categories/ID/courses/ID:指出某个指定分类下的指定课程

### URL路由配置

1. 路由记录以json格式记录在\medschool\config\URLRouter.cfg文件内

2. 在main.py中调用URLConfig().URLs

### API请求数据格式（暂定）

1. 数据格式为结构化数据json

1. 一级保留关键字为：apiVersion\context\token\param

2. apiVersion为指定api版本，不能为空，如：v1

3. context为用户环境，如用户ID为：AD1CK87，则context为AD1CK87。

4. token为用户保存在localStorage中的token，不能为空。

5. param为请求参数。

### API返回数据格式（暂定）

1. 数据格式为结构化数据json。

2. 一级保留关键字为： apiVersion\method\param\context\id\data或error

3. apiVersion为api版本，不能为空，如：v1

4. method为用户请求方法，即HTTP动作

5. param为用户请求参数

6. context为用户环境

7. 如用户请求数据成功，则返回id和data。data为结构化json数据，详情在各URL中定义

8. 如果用户请求数据失败，则返回error，error包含三个关键字：domain\reason\message。其中domain表示错误位置，reason表示错误原因，message表示错误信息

### API权限控制

1. API权限控制分为需要确权和不需要确权。

2. 需要确权的句柄应加```@accessControl```装饰器，进行确权。

示例：
    
    apiVersions = ("v1")

    def acessControl(ac):
        def _deco (func):
            def __deco (self,*args,**kwargs):
                self.param = json.loads(self.get_argument("param",""))
                self.apiVersion = self.get_argument("apiVersion","v1")
                self.token = self.get_argument("token","")
                self.context = self.get_argument("context","")
                self.error = False
                if ac:
                    '''
                        Embed your code for access control here.
                    '''
                    #self.error = True
                    self.errorMessage = "AC Test"
                    self.errorReason = "Test"
                    self.errorDomain = "AC Test"
                    print "acessControl"
                if not self.error :
                    self = func(self,*args,**kwargs)
                if self.error :
                    self.write(json.dumps({
                        'apiVersion':self.apiVersion,
                        'method':func.func_name,
                        'param':self.param,
                        'context':self.context,
                        'error':{
                            'domain':self.errorDomain,
                            'reason':self.errorReason,
                            'message':self.errorMessage
                        }
                        }).encode('utf-8'))
                else:
                    self.write(json.dumps({
                        'apiVersion':self.apiVersion,
                        'method':func.func_name,
                        'param':self.param,
                        'context':self.context,
                        'id':self.id,
                        'data':self.data
                        }).encode('utf-8'))        
            return __deco
        return _deco

    class testHandler(BaseHandler):
        @acessControl(True)
        def get(self,apiVersion):
            self.error = False
            self.errorMessage = "Test"
            self.errorReason = "Test"
            self.errorDomain = "Test"
            self.id = "ERTYJNBVF"
            self.data = "TEST data"
            return self

示例URLsRouter代码：

    class URLsRouterGenerator():
        def checkURLs (method):
            def wrap (*args,**kwargs):
                url = args[1]
                if not isinstance(url,tuple):
                    print "url should be a tuple, for example: \n\t\t(r\"/\", indexHandler)"
                    return 
                if len(url)!=2:
                    print "length of url should be 2, for example: \n\t\t(r\"/\", indexHandler)"
                    return 
                return method(*args,**kwargs)
            wrap.func_name = method.func_name
            return wrap
        def __init__(self):
            self.URLs = []
        def __call__(self):
            for item in self.URLs:
                print "%s\t==>\t%s" % (item[0],item[1])
            return
        def __get__(self):
            return self.URLs
        @checkURLs
        def __add__(self,url):
            for item in self.URLs:
                if url[0] in item:
                    print "\tFail to add, due to %s existed." % (url[0])
                    return
            self.URLs.append(url)
            print "\tAdd URL %s" % (url[0])
        @checkURLs
        def __sub__(self,url):
            for item in self.URLs:
                if url[0] in item:
                    print "\tDelete URL %s" % (url[0])
                    self.URLs.remove(item)
                    return
            print "\tFail to delete, due to record %s doesn't exist." % (url[0])

    class URLConfig():
        def __init__(self):
            cfgPath = 'config/URLRouter.cfg'
            URLsRouter = URLsRouterGenerator()
            self._all     = json.load(file(cfgPath), object_pairs_hook=OrderedDict)
            print "\033[92m"+"*"*50
            print "URL Router Table:"
            for item in self._all:
                print "  URLs for [%s]" % (item)
                for subitem  in self._all[item]:
                    URLsRouter + (r""+subitem,eval(self._all[item][subitem]))
            print "*"*50+"\033[0m"
            self.URLs = URLsRouter.URLs
