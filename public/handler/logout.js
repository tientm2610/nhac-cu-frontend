export class logout{
    constructor()
    {
        this._btnlogout = document.querySelector("#logout-button-header");

        this._onLogout = this._onLogout.bind(this);
        this._btnlogout.addEventListener("click", this._onLogout);
    }
    async _onLogout(event)
    {
        event.preventDefault()
       
        let result = confirm('Bạn có muốn đăng xuất không ?')

        if(result)
        {
            await fetch('http://localhost:3333/api/users/logout', {method: `GET`, credentials: 'include'})
            .then(message => {
                
               
                //remove local storage
                localStorage.removeItem('item');

                window.location.href = "http://localhost:3000/";
                // alert('Đăng xuất thành công')
            })
            .catch(error => console.error(error))
        }
        
    }
}
new logout();