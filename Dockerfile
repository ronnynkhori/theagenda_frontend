# Use the official NGINX image as the base image
FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

# Copy your Angular app's built files to the NGINX web root
COPY dist/ /usr/share/nginx/html/

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
