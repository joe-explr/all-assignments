
import {atom} from "recoil";
const usernameVal = atom({
    key:'username',
    default: ((localStorage.getItem("user"))!=null ? (localStorage.getItem("user")):"")
})
export default usernameVal;