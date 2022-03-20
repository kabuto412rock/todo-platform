# Initial process
```bash
# This is my creating project process 
$ yarn init

# install backend's dependencies
$ yarn add bcryptjs colors concurrently dotenv express express-async-handler jsonwebtoken mongoose 
$ yarn add --dev nodemon

# Create the backend's directory
$ mkdir backend

# Create the frontend's directory by CRA(CreateReactApp)
$ npx create-react-app frontend --template redux
$ cd frontend
$ yarn add  react-router-dom react-toastify axios react-icons react-modal
# and add Tailwind CSS, DaisyUI...
```

### 版本0.2.0 [前端]
1. 前端環境建置(CRA,TailwindCSS,Rect-Router...)
2. 使用者登入會產生一個30天的jwt token，儲存在localStorage裡面用來後續驗證
3. 使用者註冊(註冊後會自動登入)

### 版本0.1.0 [後端]
1. 使用者登入、註冊需要的後端API
2. 建立MongoDB連線的設定
3. 建立Mongo