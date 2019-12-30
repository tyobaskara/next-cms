import React,{ Component} from 'react';
import axios from 'axios';
import MainLayout from '../components/layouts/mainLayout';
import css from '../styles/main.scss';

class Home extends Component {
    static async getInitialProps({pathname,query,asPath,req,res}){
        let userData;

        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users/1')
            userData = response.data;
        } catch(e) {
            console.log('error', e);
        }

        return {
            user:{
                name:'Francis',
                lastname:'Jones'
            },
            userData
        }
    }

    constructor(props){
        super(props)

        this.state = {
            user: this.props.user,
            userData: this.props.userData
        }
    }

    render(){
       // console.log(this.state);
        return(
            <>
                <MainLayout>
                    <h1 className={css.headingOne}>Welcome to my page, guys</h1>
                </MainLayout>
            </>
        )
    }
}

export default Home;