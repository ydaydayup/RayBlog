---
title: Docker Compose 管理所有容器
date: 2024-05-26
authors: Ray
tags: [docker compose]
keywords: [docker compose]
---

<!-- truncate -->

[compose.yaml](assert/compose.yaml)

[mysql.yaml](assert/mysql.yaml)

[nginx.conf](assert/nginx.conf)

[nginx.yaml](assert/nginx.yaml)

[redis.yaml](assert/redis.yaml)

参考链接：

[使用docker compose管理所有容器](https://mp.weixin.qq.com/s?__biz=MzkzNDMxODUyMQ==&mid=2247484819&idx=1&sn=7417b9e47ab7c0e93e694ec52a1c772b&chksm=c2be5d45f5c9d453fe90a84c5a29e93d386ef2064f43b5cf0a04fe675d7d2152f4f58d3a04f1&mpshare=1&scene=1&srcid=07247D5s887Ti8HVpiUJp4r1&sharer_sharetime=1690181252391&sharer_shareid=89d4d70e158fb6353c3347683337138a#rd)


该链接还有es, minio等



- 文件附件如上

- 文件内容如下

## 步骤

把这些文件放到一个目录下，执行

```YAML
 docker-compose up -d                                                                                                                                                                                                           20:59:57
[+] Running 3/3
 ✔ Container fudy-redis  Running                                                                                                                                                                                                      0.0s
 ✔ Container fudy-mysql  Running                                                                                                                                                                                                      0.0s
 ✔ Container fudy-nginx  Started                                                                                                                                                                                                      0.2s
 yunhongze  ~/Documents/myfile/docker 
docker container ls                                                                                                                                                                                                            21:00:00
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS         PORTS                               NAMES
d538b12385de   nginx:stable   "/docker-entrypoint.…"   10 seconds ago   Up 9 seconds   0.0.0.0:80->80/tcp                  fudy-nginx
84cf4a3818c2   redis:6.0.3    "docker-entrypoint.s…"   24 hours ago     Up 5 minutes   0.0.0.0:6379->6379/tcp              fudy-redis
7e3fb2bdae4a   mysql:5.7      "docker-entrypoint.s…"   24 hours ago     Up 5 minutes   33060/tcp, 0.0.0.0:3307->3306/tcp   fudy-mysql
```

## 注意事项

nginx启动有问题，需要提前把ngixn.conf 和权限弄好，参考 docker nginx那篇

## 技巧

```YAML
# 通过如下命令来校验文件格式 compose.yaml
docker-compose config
# 停止所有容器
docker-compose stop
# 启动所有容器
docker-compose start
# 在后台创建并启动容器 Create and start containers
docker-compose up -d 
```

- 

```YAML
version: '3.5'
services:
  redis:
    extends:
      file: redis.yaml
      service: redis

  mysql:
    extends:
      file: mysql.yaml
      service: mysql
  nginx:
    extends: 
      file: nginx.yaml
      service: nginx
```

```YAML

version: '3.5'
services:
  mysql:
    image: mysql:5.7
    container_name: fudy-mysql
    platform: linux/x86_64
    ports:
      - 3307:3306
    volumes:
      - /opt/docker/mysql/log:/var/log/mysql
      - /opt/docker/mysql/data:/var/lib/mysql
      - /opt/docker/mysql/conf:/etc/mysql/conf.d
    environment:
      - MYSQL_ROOT_PASSWORD=123456
    privileged: true

```

```YAML
version: '3.5'
services:
  nginx:
    image: nginx:stable
    container_name: fudy-nginx
    ports:
      - 80:80
    volumes:
      - /opt/docker/nginx/nginx.conf:/etc/nginx/nginx.conf
      - /opt/docker/nginx/logs:/var/log/nginx
    privileged: true

```

```YAML

version: '3.5'
services:
  redis:
    image: redis:6.0.3
    container_name: fudy-redis
    ports:
      - 6379:6379
    volumes:
      - /opt/docker/redis/conf/redis.conf:/etc/redis/redis.conf
      - /opt/docker/redis/data:/data
    command:
      /bin/bash -c "redis-server /etc/redis/redis.conf"

```

