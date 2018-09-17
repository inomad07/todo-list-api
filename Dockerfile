FROM node:8.9.4
MAINTAINER Damon <noneprado@gmail.com>

ENV RUN_USER            root
ENV RUN_GROUP           root
ENV ADMIN_HOME  /usr/src/app

# Create app directory
RUN mkdir -p                               "${ADMIN_HOME}" \
    && chmod -R 700                        "${ADMIN_HOME}" \
    && chown -R ${RUN_USER}:${RUN_GROUP}   "${ADMIN_HOME}"

# Bundle app source
COPY . "${ADMIN_HOME}"

#RUN ls -la "${FG_ADMIN_HOME}"

WORKDIR "${ADMIN_HOME}"

RUN curl https://install.meteor.com/ | sh

# Install app dependencies
RUN npm install

#TimeZone
ENV TZ=Asia/Bishkek
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

USER ${RUN_USER}:${RUN_GROUP}

EXPOSE 8000

VOLUME ["${ADMIN_HOME}"]

#Start admin on certain host and port
CMD [ "npm", "start" ]
