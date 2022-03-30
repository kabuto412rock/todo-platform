FROM node:16-alpine
WORKDIR /app
EXPOSE 3000
EXPOSE 5000

# 先產生/app/frontend的建置檔案
COPY ./frontend /app/frontend
WORKDIR /app/frontend
RUN yarn install 
RUN yarn run build

# 使用後端當作伺服器
COPY ./backend /app/backend
WORKDIR /app/backend
RUN yarn install
CMD ["yarn","start" ]
