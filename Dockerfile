# Use the official NGINX image as the base image
FROM nginx

# Copy your Angular app's built files to the NGINX web root
COPY dist/ /usr/share/nginx/html/

# Copy your custom NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
