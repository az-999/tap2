FROM scaleway/cli:2.34

WORKDIR /application
RUN \
  apk add mysql-client && \
  cp /scw /usr/local/bin/
COPY ./migrate/run.sh /application/run.sh
ENTRYPOINT [ "/bin/bash" ]
CMD [ "-c","/application/run.sh" ]
