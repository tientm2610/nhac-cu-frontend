export class logout{
    constructor()
    {
        this._btnlogout = document.querySelector("#btn_logout");

        this._onLogout = this._onLogout.bind(this);
        this._btnlogout.addEventListener("click", this._onLogout);
    }
    async _onLogout()
    {
        let result = confirm('Bạn có muốn đăng xuất không ?')

        if(result)
        {
            await fetch('http://localhost:3333/api/users/logout', {method: `GET`, credentials: 'include'})
            .then(message => {
                alert('Đăng xuất thành công')
                window.location.href = "http://localhost:3000/";
            })
            .catch(error => console.error(error))
        }
        
    }
}
new logout();