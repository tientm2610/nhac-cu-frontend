
export default class User{

    constructor(data) {
        this.username = data.username;
        this.password = data.password;
        this.fullname = data.fullname;
        this.phone = data.phone;
        this.address = data.address;
        this.gender = data.gender;
        this.birth = data.birth;
        this.role = data.role;
    }
    //Đăng nhập
    static async login(username, password) {
        try {
            const response = await fetch(`http://localhost:3333/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, password: password }),
                credentials: 'include' // Gửi cookie của phiên làm việc
            });

            if(response.status === 200){
                const { fullname } = await response.json();
                return fullname;
            } else {
                response.json().then(data => {
                    // alert(data.error); // Hiển thị thông báo lỗi từ server
                    throw new Error(data.error);
                });
            
            } 
        } catch (error) {
            console.error('Error logging in:', error);
            throw new Error(error);
        }
    }

    //Đăng xuất
    static async logout(){
         await fetch(`http://localhost:3333/api/users/logout`);
       
    }

    //Cập nhật thông tin người dùng
    static async updateInfo(data){
        try {
            const user = {
                username: data.username,
                password: data.password,
                fullname: data.fullname,
                phone: data.phone,
                address: data.address,
                gender: data.gender,
                birth: data.birth,
                role: data.role
            };
    
            const response = await fetch(`http://localhost:3333/api/users/update-info`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
                credentials: 'include'
            });
    
            const updatedUserInfo = await response.json();
            Object.assign(this, updatedUserInfo);
        } catch (error) {
            console.error('Error updating user info:', error);
            return null;
        }
    
    }

    // Hiện thông tin người dùng
    static async getInfo(){
        const respponse = await fetch(`http://localhost:3333/api/users/me`);
       const user = respponse.json();
        return this(user)
    }

    //Đăng ký tài khoản
    static async register(userData) {
        try {
            const response = await fetch('http://localhost:3333/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
                credentials: 'include'
            });
            if(response.status === 404){
                const res = await response.json();
                console.log(res)
                return undefined;
            }
            if (response.status !== 200 && !response.body) {
                return undefined;
            } else {
                const {fullname} = await response.json();
                
                return fullname;
            }
        } catch (error) {
            console.error('Error registering user:', error);
            return null;
        }
    }
    
}