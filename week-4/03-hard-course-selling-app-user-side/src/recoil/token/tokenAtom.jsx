import {atom} from "recoil";
const tokenVal =atom({
    key:"token",
    default: ((localStorage.getItem("token"))!=null ? (localStorage.getItem("token")):"0")
})
export default tokenVal;