# MXCP.ETLSVC
**關於此服務 (About)**  
提供 ETL 相關服務如: 
- Data Mapping

**使用路由 (Routes)**  
```
\v1\etlsvc
```

**版本歷史 (Version History)**
- v1.0 (2023.05.22)  
  初版


___  


安裝npm套件
```bash
npm install
```
設置環境變數 .env
```bash
cp .env.example .env
```
設置SAP RFC連線參數 sapnwrfc.ini
```bash
cp sapnwrfc.ini.example sapnwrfc.ini
```
啟動
```bash
# running in development mode
npm run dev
# running in production mode
npm run start
```

測試
```bash
# run all tests
npm run test

# run all tests in watch mode
npm run test:watch

# run test coverage
npm run coverage
```

Linting:

```bash
# run ESLint
npm run lint

# fix ESLint errors
npm run lint:fix

# run prettier
npm run prettier

# fix prettier errors
npm run prettier:fix
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Sequelize models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API 文件
要查看可用API的列表及其規範，請啟動開發模式並在瀏覽器中開啟 http://localhost:3000/v1/docs

## 資料庫規範
資料表名稱使用upper camel case，使用單數。 ex: Product, ProductCategory
資料欄位名稱使用lower snake case。 ex: user_id, product_id

## 建立API步驟
ex: Support
1. `cp src/controllers/user.controller.js src/controllers/support.controller.js`
2. `cp src/models/user.model.js src/models/support.model.js`
3. `cp src/routes/v1/user.route.js src/routes/v1/support.route.js`
4. `cp src/services/user.service.js src/services/support.service.js`
5. `cp src/validations/user.validation.js src/validations/support.validation.js`
6. 依需求修改上面複製的內容
7. 將supportModel新增到src/models/index.js
8. 將supportRoute新增到src/routes/v1/index.js
9. 依操作權限修改src/config/roles.js
10. 將要輸出的Data model schema新增到src/docs/swagger.yaml裡的components/schemas
11. 依需求修改swagger文件src/docs/swagger.yaml
12. 執行`npm run migration:generate create-support`產生migration檔案
13. 根據src/models/support.model.js裡的資料屬性修改上述指令產生的檔案，並將輸入參數Sequelize改成DataTypes
14. 執行`npm run migrate`
