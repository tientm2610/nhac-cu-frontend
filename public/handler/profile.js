//cập nhật thông tin người dùng

document.addEventListener('DOMContentLoaded', function() {
    const updateButton = document.querySelector('input[type="submit"]');

    updateButton.addEventListener('click', async function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của nút submit

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const fullname = document.getElementById('fullname').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const birth = document.getElementById('birth').value;

        if (
            !username ||
            !password ||
            !fullname ||
            !phone ||
            !address ||
            !birth
          ) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
          }
      
          // Kiểm tra định dạng số điện thoại
          const phoneRegex = /^[0-9]{10}$/;
          if (!phoneRegex.test(phone)) {
            alert("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
            return;
          }
      
          // Kiểm tra định dạng ngày sinh
          const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!birthRegex.test(birth)) {
            alert(
              "Ngày sinh không hợp lệ. Vui lòng nhập lại theo định dạng dd-mm-yyyy."
            );
            return;
          }
        try {
            const response = await fetch('http://localhost:3333/api/users/update-infor', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: username,
                    password: password,
                    fullname: fullname,
                    phone: phone,
                    address: address,
                    birth: birth
                })
            });

            if (response.ok) {
                alert('Thông tin đã được cập nhật thành công.');
            } else {
               alert(`Cập nhật thông tin thất bại. Mã lỗi: ${response.json()}` );
            }
        } catch (error) {
            alert(`Lỗi khi gửi yêu cầu cập nhật thông tin người dùng: ${error}`);
        }
    });
});