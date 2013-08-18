[![Build Status](https://secure.travis-ci.org/cabrel/cabrel-stockpile.png)](http://travis-ci.org/cabrel/cabrel-stockpile)

cabrel-stockpile
================

A set of utility functions for everyday use


## General

* `log`
    * `print`


## Crypto

Most of these methods are wrappers around other implementations. The reason is to have
all of the argument validation and preparation done already

* `aspnet`
  * `authenticate(password, salt, hash)`
  * `generate(password, salt)`
* `iron`
  * `seal(data, password, options)`
      * Inputs
          * `data` - Required
          * `password` - Required
          * `options` - Optional; defaults to Iron.defaults
      * Outputs
          * String
  * `unseal(data, password, options)`
      * Inputs
          * `data` - Required
          * `password` - Required
          * `options` - Optional; defaults to Iron.defaults
      * Outputs
          * `unsealed object`
* `pbkdf2`
  * `authenticate(password, salt, hash)`
      * Inputs
          * `password` - Required
          * `salt` - Required
          * `hash` - Required
      * Outputs
          * Boolean
  * `generate(password, salt)`
      * Inputs
          * `password` - Required
          * `salt` - Optional
      * Outputs
          * Object:
              * `hash`
              * `salt`
