main = require './main.js'
mysql = require 'mysql'
fs = require 'fs'

exports.setupDB = () ->
    main.dbcon.query "CREATE TABLE `users` ( `dbid` INT NOT NULL AUTO_INCREMENT , `id` INT(255) NOT NULL , `guildid` INT(255) NOT NULL , `username` VARCHAR(255) NOT NULL , `xp` INT(255) NOT NULL , `comments` LONGTEXT NOT NULL , PRIMARY KEY (`dbid`)) ENGINE = InnoDB;"
    
