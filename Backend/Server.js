import 'dotenv/config'
import App from "./src/App";
import DB from "./src/Config/DB";

const PORT=process.env.PORT||3000

DB();

App.listen(PORT,()=>{
    console.log('Server is running on port 3000')
})