FROM nginx:1.9.15

### File Author / Maintainer
MAINTAINER "Diego Perez Molinero dperez@ust-global.com"

#Install Curl
RUN apt-get update
RUN apt-get install curl -y

#nginx configuration disable defaults
#RUN mv /etc/nginx/conf.d/default.conf default.conf.disabled

#Copy the custom configuration
#COPY docker_conf/nginx.conf /etc/nginx/nginx.conf

#Copy the application distribution
COPY dist /usr/share/nginx/html
