# Miki.Tran says hello

# cai dat

- su dung template `themwagon` - bootstrap5 admin dashboard template
- cai dat react-app `npx create-react-app blog-reactjs`
- cai `npm i react-router-dom` su dung `outlet` de hien thi cac rule-children
- su dung `reac-toastify` de hien thi thong bao
- cai dat `npm i react-spinners` cai dat loading... khi user login;
- cai dat `npm i redux react-redux`
- cai dat `npm i react-bootstrap`
- cai dat `npm i react-hook-form`

# noi dung code

- buil cac component `login, dashboard, register` - clone template
- them Router o index.js
- thiet lap Router o app.js
- check validate form; su dung regex `/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/` validate email
- luu access token vao localstorage
- su dung `useNavigate` de chuyen tiep page
- khi user da login -> can redirect vao dashboard; khi chua login can y/c **login**
- khi user login login se hien thi `loading` = cach su dung `react-spinners`; co the xem mau demo de su dung
- dung `intercepter -axios` xu ly y/c truoc khi dc gui di || sau khi nhan duoc phan hoi tu api; ap dung de truyen access-token & xu ly refresh token; khi bi 2 lan call refresh-token => comment lai strick-mode o index.js (do la phan cai dat cho dev)
- sua sidebar; tao component `users  list`
- tach common component, su dung globalLoading khi get.api
- tao table hien thi user list
- su dung pagination cho user list;
- change list theo items-per-page; neu chi co 1 page thi an pagination
- `live search` khi user ngung nhap nd moi goi api; du dung delaydebounce (setTimeout)
- delete one & multiple blogs; delete.multiple voi all items/current page; neu nguoi dung chon all items tren page hien thoi thi checkall cung duoc checked.
- su dung Modal.boostrap de su dung box.confirm
- them usermoi, update user; su dung package de validate add new-user `react-hook-form`: giam luong render, rerender, validate form, quan ly du lieu form.
- handle multiple request api - sd Promise.all(), page 404

### noi dung code 02

- display & update avatar: display avatar tu api; hien thi hinh khi user chon img moi;
- upload image = `FormData`; khi user chua update avatar -> nut `update` se an.

## su dung spinners

- can truyen trang thai login tu comp `login` sang `layout` - giao dien tong; su dung prop | Redux | react-context
- o day sai redux

# **time**

`16:28`
