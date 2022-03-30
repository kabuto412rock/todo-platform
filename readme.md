# 專案說明
這是使用MERN Stack的網頁專案，概要:
1. Express.js和MongoDB作為後台提供REST API
2. ReactJS搭配Redux toolkit作為前端
3. 內含帳號註冊登入、列表查詢、頁面編輯等常見功能

# 預覽畫面
![todo-platform的首頁](./imgs/home.png)
![todo-platform的列表](./imgs/notes.png)
![todo-platform的新增](./imgs/new-note.png)


# 啟動開發環境（Docker）
```bash
# 複製todo-platform的儲存庫
 $ git clone https://github.com/kabuto412rock/todo-platform.git

# 進入儲存庫內的資料夾
$ cd todo-platform 

# Docker啟動開發容器[預設後端PORT:5000, 前端PORT:3000 ]
(todo-platform) $ docker-compose up -d

# 關閉開發容器 
(todo-platform) $ docker-compose down
```

# 啟動部屬環境 (Docker)
```bash
# 啟動部屬容器 [預設後端PORT:5000，前端已編譯成靜態頁面在後端路由]
(todo-platform) $ docker-compose -f docker-compose-production.yaml up -d
# 關閉部屬容器
(todo-platform) $ docker-compose down

```


## Docker 容器內的環境變數
```bash
# docker-compose.yaml
# 建置環境, NODE_ENV = {開發環境}
NODE_ENV = development
# 後端的連線PORT, PORT=5000
PORT = 5000
# 連線到MongoDB的連結, MONGO_URI= {MONGODB連線的網址} 
MONGO_URI = mongodb+srv....
# JWT Toekn的加密參數, JWT_SECRET = {加密參數}
JWT_SECRET = thisisSecret
```

如果本地端沒有MongoDB，不想建置在Docker容器內，
可以前往[MongoDB官網](https://cloud.mongodb.com/)申請一個開發用的免費DB來連線，

## 版本紀錄
### 版本0.3.5
1. 建立部屬用的Docker設定
2. 建立開發用的Docker設定

### 版本0.3.2
1. 重整時候Notes要有Loading的圖示出現
2. 筆記明細只有在本人觀看時，才可看到編輯刪除的按鈕
3. 筆記明細可刪除功能

### 版本0.3.0 [前+後端]
1. 建立筆記
2. 編輯筆記
3. 筆記列表排序查詢

### 版本0.2.0 [前端]
1. 前端環境建置(CRA,TailwindCSS,Rect-Router...)
2. 使用者登入會產生一個30天的jwt token，儲存在localStorage裡面用來後續驗證
3. 使用者註冊(註冊後會自動登入)

### 版本0.1.0 [後端]
1. 使用者登入、註冊需要的後端API
2. 建立MongoDB連線的設定
3. 建立Mongo
