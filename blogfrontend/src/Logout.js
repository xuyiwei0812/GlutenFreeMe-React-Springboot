import React from 'react';
import { useAuth } from './AuthContext'; // 确保从正确的路径导入
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const { logout } = useAuth();
    const history = useHistory();

    // 当组件加载时，执行注销逻辑
    React.useEffect(() => {
        logout(); // 清除认证状态
        sessionStorage.removeItem('user');
        history.push('/login'); // 重定向到登录页面
    }, [logout, history]);

    // 可以返回一个加载指示器或者简单的文本，表示正在注销
    return (
        <div style={{ padding: '20px' }}>
            Logging out...
        </div>
    );
};

export default Logout;
