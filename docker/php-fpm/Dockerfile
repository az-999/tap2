FROM phpdockerio/php:8.1-fpm
WORKDIR "/application"

# Fix debconf warnings upon build
ARG DEBIAN_FRONTEND=noninteractive

# Install selected extensions and other stuff
RUN  apt-get update
RUN  apt-get install -y curl
RUN  curl -sS https://getcomposer.org/installer -o composer-setup.php
RUN  php composer-setup.php --install-dir=/usr/local/bin --filename=composer
RUN  apt-get install supervisor -y
RUN  apt-get -y --no-install-recommends install git
RUN  apt-get -y --no-install-recommends install wget
RUN  apt-get -y --no-install-recommends install php8.1-memcached
RUN  apt-get -y --no-install-recommends install php8.1-yaml
RUN  apt-get -y --no-install-recommends install php8.1-mysql
RUN  apt-get -y --no-install-recommends install php8.1-curl
RUN  apt-get -y --no-install-recommends install php8.1-bcmath
RUN  apt-get -y --no-install-recommends install php8.1-mbstring
RUN  apt-get -y --no-install-recommends install php8.1-gmp
RUN  apt-get -y --no-install-recommends install php8.1-gd
RUN  apt-get -y --no-install-recommends install php8.1-intl
RUN  apt-get -y --no-install-recommends install php8.1-mcrypt
RUN  apt-get -y --no-install-recommends install php8.1-redis


#RUN  apt-get -y --no-install-recommends install php8.1-dev
#RUN  apt-get -y --no-install-recommends install build-essential

#COPY phpredis /etc/phpredis
#WORKDIR "/etc/phpredis"
#RUN phpize
#RUN ./configure
#RUN make
#RUN make install