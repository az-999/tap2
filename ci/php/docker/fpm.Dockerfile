FROM phpdockerio/php:8.1-fpm AS build

ARG DEBIAN_FRONTEND=noninteractive

USER root
RUN --mount=type=cache,target=/var/cache/apt \
  apt-get update && \
  apt-get install -y --no-install-recommends \
    php8.1-memcached \
    php8.1-yaml \
    php8.1-mysql \
    php8.1-curl \
    php8.1-bcmath \
    php8.1-mbstring \
    php8.1-gd \
    php8.1-gmp \
    php8.1-intl \
    php8.1-mcrypt \
    php8.1-redis \
    gettext && \
    apt-get clean \
    && rm -rf /var/lib/apt/lists/*

USER www-data
WORKDIR /application

COPY --chown=www-data:www-data laravel/composer.* /application/

RUN composer install --verbose --no-autoloader

ENV PHP_FPM_PM=static
ENV PHP_FPM_PM_MAX_CHILDREN=20
ENV PHP_FPM_PM_START_SERVERS=5
ENV PHP_FPM_PM_MIN_SPARE_SERVERS=5
ENV PHP_FPM_PM_MAX_SPARE_SERVERS=5
ENV PHP_FPM_PM_MAX_REQUESTS=300
ENV PHP_SLEEP=45
ENV PHP_FPM_PM_MEMORY_LIMIT=256M
ENV PHP_FPM_LISTEN="0.0.0.0:9000"

COPY --chown=www-data:www-data version.json /application/version.json
COPY --chown=www-data:www-data ci/php/docker/entrypoint.sh /entrypoint.sh
COPY --chown=www-data:www-data ci/php/docker/entrypoint-loop.sh /entrypoint-loop.sh
COPY --chown=www-data:www-data ci/php/docker/www.pool.conf /etc/php/8.1/fpm/pool.d/z-overrides.conf

COPY --chown=www-data:www-data laravel /application
COPY --chown=www-data:www-data ci/php/docker/env.template /application/.env.template

RUN composer install --verbose

EXPOSE 9000
ENTRYPOINT ["/entrypoint.sh"]
CMD [ "/usr/sbin/php-fpm8.1","-O"]
