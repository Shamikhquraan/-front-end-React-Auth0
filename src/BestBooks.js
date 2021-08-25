import React from 'react';
import SelectBook from "./components/SelectBook";
import "./BestBooks.css";
import { Button } from 'react-bootstrap';
import  Card  from 'react-bootstrap/Card';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
const axios = require('axios');
require('dotenv').config();



class MyFavoriteBooks extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      books: [] ,
      showData:false,
      show:false,
    }
  }
   componentDidMount = async ()=> {
    const { user } = this.props.auth0;
    console.log(this.props.auth0);
    let emailaddress = user.email;
    console.log('email',emailaddress);

    try {

    let bookData = await axios.get(`${process.env.REACT_APP_SERVER}/getBooks?email=${emailaddress}`);


    bookData? await this.setState({
      books: bookData.data ,
      showData: true,

    }) : this.setState({
      books: [] ,
      showData: false,

    }) }catch(error){
    await this.setState({
        books: [] ,
        showData: false,
  
      })

    }
    
    console.log(this.state.books);
  }



  handleAddBook  = async (e) =>{
    console.log(e.target.status.value);
    e.preventDefault();

    let books ={
      status : e.target.status.value,
      description : e.target.desc.value,
      email : e.target.email.value,
      title : e.target.title.value,
    }

    let bookData = await axios.post(`${process.env.REACT_APP_SERVER}/addBook?email=${this.props.auth0.user.email}`,books);
    console.log(bookData);
    await this.setState({
      books: bookData.data,
    });
  
  }


  handelShowModel= async ()=>{ 
    console.log(this);
    await this.setState({
      show:true,
    });

  }
 handleClose=async ()=>{
    await this.setState({
      show:false,
    })
  }

  deleteBook = async (bookID) =>{
  
    let bookData= await axios.delete(`${process.env.REACT_APP_SERVER}/deletBook/${bookID}?email=${this.props.auth0.user.email}`);
    console.log(bookData.data);
    this.setState({
      books: bookData.data,
    });
    
  }

  render() {
    
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
          <Button onClick={this.handelShowModel}> Add New Book</Button>

        </Jumbotron>
        <div className='tab2'>
        {this.state.showData && this.state.books.map((element,key) => {
          return(
          <Card key ={key} style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Img
            className="d-block w-100"
            src='https://www.concrete-online.co.uk/wp-content/uploads/2020/07/dark-gloomy-books-pages-preview.jpg'
            alt={element.title}
          />
              <Card.Title>● {element.title}</Card.Title>
              <Card.Text>
              ● {element.description}
              </Card.Text>
              <Card.Text>
              ● {element.status}
              </Card.Text>
              <Card.Text>
              ● {element.email}
              </Card.Text>
            </Card.Body>
            <h3 className="favorites"> 🧾Delet Book: </h3>
          <Button onClick={()=>this.deleteBook(element._id)}>Delete</Button>
          </Card>)
        })
        }
        </div>
        <SelectBook show={this.state.show} handleClose={this.handleClose} handleAddBook={this.handleAddBook} />

      </>
    )
  }
}

export default  withAuth0(MyFavoriteBooks);