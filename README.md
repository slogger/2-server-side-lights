# Nodejs

[![bitHound Overall Score](https://www.bithound.io/github/slogger/2-server-side-lights/badges/score.svg)](https://www.bithound.io/github/slogger/2-server-side-lights)
[![Build Status](https://travis-ci.org/slogger/2-server-side-lights.svg?branch=task)](https://travis-ci.org/slogger/2-server-side-lights)

## Первое задание «Светофор»
Напишите работу движения трамвая на сервере. Оформите это в виде сервиса, который по запросу светофора (раз в n секунд) отвечает приближается трамвай или нет.
Светофор соответсвенно на это реагирует загоранием светофора
## Второе задание *
Необходимо реализовать работу светофора на сервере. Вынести в отдельный модуль, и экспортировать его в основной файл.
В основном файле создать объект светофор, запустить его работу. развернуть простой вебсервер - который отдает пользователю пришедшему на localhost:3000 текущее состояние светофора. Из-за приближения трамвая светофор горит зеленым 15 секунд

## ШРИ 2016

#### Про логи
Если логировать много и часто, то из них можно извлечь много информации, статистику по пользователям, мониторить сессии, популярные ресурсы, наиболее активных пользователей, когда серверов много, лучше выделить какой-нибудь из них под логи и отправлять их все туда, хорошо если они все в одном формате (напр. bunyan), добавляем Logstash+elastic search что-бы удобно их анализировать, что-нибудь для графиков (grafana), и алерт систему, что-бы получить смс на телефон когда внезапно всё упало или письмо, сообщение в месенджер при варнингах (нагрузка меньше\\больше положеного, заканчиваются ресурсы и тд)

Конкретно хероковские логи

пишут о сборках, изменение стейта (Idling, Unidling), сообщение от внутренненго хероковского роутера, о том какие запросы приходят, ну и всё что мы пишем из своего кода в stdout
