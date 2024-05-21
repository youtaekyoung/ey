import { Component } from 'react';
import UserSerive from '../service/UserSerive';

class TestComponent extends Component{
    state = {
        name:"user",
        item:[]
    }

    componentDidMount(){
        UserSerive.getUsers().then((res) => {
            this.setState({item:res.data})
        })
    }
    render() {
        return (
            <div>
            <h2 className="text-center">User List</h2>
            <div className="row">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>아이디</th>
                            <th>가입일</th>
                            <th>권한</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.item.map(
                                user =>
                                    <tr key={user.key}>
                                        <td>{user.id}</td>
                                        <td>{user.joindate}</td>
                                        <td>{user.auth}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}

export default TestComponent;