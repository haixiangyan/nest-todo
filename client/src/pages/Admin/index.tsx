import { FC, useEffect, useState } from 'react';
import { User } from '../../types/User';
import http from '../../http';

const Admin: FC = () => {
  const [userList, setUserList] = useState<User[]>([]);

  const fetchUserList = async () => {
    const { data } = await http.get('/user');
    setUserList(data);
  }

  useEffect(() => {
    fetchUserList().then();
  }, []);

  return (
    <div>
      <h1>管理员页面</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>邮箱</th>
            <th>密码</th>
            <th>是否管理员</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password || '-'}</td>
              <td>{user.is_admin === 1 ? '是' : '否'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Admin;
