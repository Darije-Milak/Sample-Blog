  import React, { Component } from 'react';
  //import logo from './logo.svg';
  import './App.css';
  import BlogHeader from './components/blogHeader';
  import Articles from './components/articles';
  import BlogLogin from './components/blogLogin';
  import BlogSignin from './components/blogSignin'; 
  import EditModule from './components/editModule'; 
  import ChangeUser from './components/changeUserName'; 
  import ChangePassword from './components/changeUserPassword'; 

 

  class App extends Component {
    
    state = {
      articles: "",
      users: "",
      loaded: false,
      posterId: "",
      showHeaderUserTools: false,
      showHeaderWidget: true,
      showWelcomeMessage: false,
      showEditModule: false,
      showArticles: true,
      showLogin: false,
      showSignin: false,
      showChangeUserData: false,
      showChangeUserPassword: false,
      currentUserEmail: "",
      currentUserFirstName: "",
      currentUserLastName: "",
      oldPassword: "",
      newPassword: "",
      loggedEmail: "",
      loggedFirstName: "",
      loggedLastName: "",
      tokenRequest : "http://www.scripttic.com:8000/oauth2/token",
      Requests : "http://www.scripttic.com:8000/api/v1/",
      LoggingUserEmail: "",
      LoggingUserPassword: "",
      showArticleEditButton: false,
      showArticleDeleteButton: false,
     // currentEditTitle: "New Title",
     // currentEditBody: "Input some Text",
      valueTitle: "New Article Title",
      valueBody: "New Article Body",
      valueId: "ZERO",
      valuePosterId: "N/A",
      commentVisible: false,
      commentBody: "Some comment body",
      showCommentsEditButtons: false,
      showPostCommentButton:false
    }

    //-- componentDidMount()
    componentDidMount() {
      fetch(this.state.Requests + 'article')
      .then(res => res.json())
      .then((articles) => {
        this.setState({articles, loaded: true});
        //console.log(this.state.articles);
        //this.state.articles.filter(art => {if (art.id !== 111) console.log(art)});
        const arti = this.state.articles.filter(art => art.id !== 111);
        console.log(arti);

        console.log (this.state.articles[0].body);
      })

      
    }

    // -- logUser()
    logUser = (email, pass) => {
     console.log("logUser function");
      let data = new URLSearchParams({
        'grant_type': 'Bearer',
        'email': email,
        'password': pass
      }); 
      // let nesto = "grant_type=Bearer&email=qqq@aaa.test&password=!aaa1234";
      const options = 
      {
        method: 'POST',
        body: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }

      fetch(this.state.tokenRequest, options)
      .then((response)=> { if (response.ok) {return response.text()} else throw Error("Error in login")})
      .then(text => {localStorage.setItem('token',text); this.getUserData();
      this.setState({
        showLogin: false,
        showHeaderUserTools: true,
        showHeaderWidget: false,
        showWelcomeMessage: true,
        showArticles: true,
        showEditModule: true,
        showCommentsEditButtons: true,
        showPostCommentButton: true
      });
    })
      .catch(error => console.log(error, "error"))
      
      console.log(this.state.showWelcomeMessage);
    }


    getUserData = () => {
      console.log("get user data");
      let options = {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem("token")
        }
      } 
      fetch(this.state.Requests + 'user', options)
      .then((response) =>  {return response.json()})
      .then((userCredetials) =>  { 
        console.log(userCredetials);
        localStorage.setItem("id",userCredetials.id);
        localStorage.setItem("firstName",userCredetials.firstName);
        localStorage.setItem("lastName",userCredetials.lastName);
        localStorage.setItem("email",userCredetials.email);
        this.setState({
          posterId: userCredetials.id,
          currentUserEmail: userCredetials.email,
          currentUserFirstName: userCredetials.firstName,
          currentUserLastName: userCredetials.lastName,
          loggedFirstName: userCredetials.firstName,
          loggedLastName: userCredetials.lastName
        });
        console.log(this.state.posterId, this.state.loggedFirstName, this.state.loggedLastName); 
      })
      .catch((error) => console.log(error));
    }

    addNewUser = (first, last, email, password) => {
        console.log(first, last, email, password);
        let options = {
          method: 'POST',
          data: {
            "email": email,
            "firstName": first,
            "lastName": last,
            "pass": password
          },
          headers: {'Content-Type': 'application/json'}
        }

        fetch(this.state.Requests + "user", options)
        .then((response) => { return response.text()})
        .then((some) => console.log(some))
        .catch(error => console.log(error))
    }

    showUserNameChange = () => {
      console.log("change User Name");
      this.setState({
        showChangeUserData: true,
        showChangeUserPassword: false,
        showEditModule: false,
        showArticles: false
      });
    }

    showUserPasswordChange = () => {
      console.log("change User Password");
      this.setState({
        showChangeUserPassword: true, 
        showChangeUserData: false,
        showEditModule: false,
        showArticles: false
      });
    }

    changeBasicUserData = () => {
      console.log(" function change Basic User Data");
      let data = {
        email: this.state.currentUserEmail,
        "firstName": this.state.currentUserFirstName,
        "lastName": this.state.currentUserLastName,
      }

      console.log(this.state.currentUserEmail);

      let options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("token")
        }
      }
      console.log(options);

      fetch(this.state.Requests + "user", options)
      .then((response) => 
      {
        console.log(response);
        return response.json();
      })
      .then((datas) => {
        console.log(datas);
        //localStorage.setItem("email", datas.email);
        localStorage.setItem("firstName", datas.firstName);
        localStorage.setItem("lastName", datas.lastName);
        this.setState({
          loggedFirstName: datas.firstName,
          loggedLastName: datas.lastName,
          loggedEmail: datas.email,
          currentUserEmail: datas.email,
          showChangeUserData: false,
          showArticles: true,
          showEditModule: true
        });
        console.log(this.state.currentUserEmail);
      })
      .catch((error) => console.log(error));
    }

    changePassword = () => {
      console.log("Function change password");

      let data = {
        oldpass: this.state.oldPassword,
        newpass: this.state.newPassword,
        id: 50
      };

      let options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': "Bearer " + localStorage.getItem("token")
        }
      }

      console.log(options);

      fetch(this.state.Requests + "user/changepass",options)
      .then((response) => {console.log(response); return response.json();})
      .then((datas) => console.log(datas))
      .catch((error) => console.log(error));
    }

    cancelChangeUserDataForm = () => {
      this.setState({
        showChangeUserPassword: false, 
        showChangeUserData: false,
        showEditModule: true,
        showArticles: true
      });
    } 

    addNewArticle = (title, body) => {
      console.log(title, body, "clicked on Submit Article");

      let articleTitle = title;
      let articleBody = body;
      //console.log(this.state.posterId);

      let data = {
        'posterId': 50,
        'body': articleBody,
        'title': articleTitle
      }; 

      let options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem("token")
        }
      }

      fetch(this.state.Requests + 'article', options)
      .then((response) => {
         const articles = this.state.articles;
         this.setState({articles, loaded: true});
         return response.json()
        })
      .then((data) => console.log(data.id))  
      .catch((error) => console.log(error));
      // const articles = this.state.articles;
      // this.setState({articles, loaded: true});
    }


    showLoginScreen = () => {
      this.setState (
        {
          showLogin: true,
          showHeaderWidget: false,
          showSignin: false,
          showArticles: false
        }
        );
      console.log("clicked on Login");
    }


    showSigninScreen = () => {
        this.setState(
        {
          showSignin: true,
          showHeaderWidget: false,
          showLogin: false,
          showArticles: false
        });
      console.log("clicked on Signin");
    }


    showArticlesNotLogged = () => {
      this.setState(
        {
          showArticles: true,
          showHeaderWidget: true,
          showLogin: false,
          showSignin: false,
        });
      console.log("clicked on Cancel");
    }


    getTitleBody = (title, body, id, posterId) => {
      //console.log("Key-App");

      console.log(id);

      this.setState({valueTitle: title, valueBody: body, valueId: id, valuePosterId: posterId});
      let toEditModule = document.getElementById("eac");
      console.log(toEditModule.offsetTop);
      window.scrollTo(0, Number(toEditModule.offsetTop));
      //console.log(this.state.valueTitle, this.state.valueBody, id, "App");

    }

    handleCurrentUserEmailChange = (event) => {
      event.preventDefault();
      this.setState({currentUserEmail: event.target.value});
      console.log(event.target.value, "Target");
    }

    handleCurrentUserFirstNameChange = (event) => {
      event.preventDefault();
      this.setState({currentUserFirstName: event.target.value});
      console.log(event.target.value, "Target");
    }

    handleCurrentUserLastNameChange = (event) => {
      event.preventDefault();
      this.setState({currentUserLastName: event.target.value});
      console.log(event.target.value, "Target");
    }

    handleEditTitleChange = (event) => {
      event.preventDefault();
      this.setState({valueTitle: event.target.value});
      console.log(event.target.value, "Target");
    }

    handleEditBodyChange = (event) => {
      event.preventDefault();
      this.setState({valueBody: event.target.value});
      console.log(event.target.value, "Target");
    }

    handleOldPasswordChange = (event) => {
      event.preventDefault();
      this.setState({oldPassword: event.target.value});
      console.log(event.target.value, "Target");
    }

    handleNewPasswordChange = (event) => {
      event.preventDefault();
      this.setState({newPassword: event.target.value});
      console.log(event.target.value, "Target");
    }

   
    
    changeArticle = (title, body, id, posterId) => {
      console.log(title, body, id, posterId,"change Article function");

      let data = {
        "id": id,
        "title": title,
        "body": body,
        "posterId": posterId
      }

      let options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:  {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem("token") 
        }
      }
      fetch(this.state.Requests + 'article', options)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        //console.log(data.title);

        // this.state.articles.filter(body => body.id === Number(id))[0].body = data.body;
        // this.state.articles.filter(title => title.id === Number(id))[0].title = data.title;
        // let articles = this.state.articles;
        // this.setState({articles});


        const currentArticle = this.state.articles.find(article => article.id === Number(id));
        const updatedArticels = this.state.articles.filter(ua => ua.id !== Number(id));
        console.log(currentArticle);
        console.log(updatedArticels);

       

        //console.log(newArtciles.sort((a,b) => (a.id < b.id) ? 1: -1));

        currentArticle.body = data.body;
        const newArtciles = [currentArticle, ...updatedArticels];
        console.log(newArtciles.sort((a,b) => (a.id < b.id) ? 1: -1));
        this.setState({articles: newArtciles});

      })
      .catch((error) => console.log(error));

      let backToArticle = document.getElementById(String(id));
      console.log(id, backToArticle, backToArticle.offsetTop);
      window.scrollTo(0, Number(backToArticle.offsetTop));

      // this.moveToArticle();
      // let articles = this.state.articles;
      // this.setState({articles});
    }

    moveToArticle = () => {
      console.log(500);
      window.scrollTo(0,500);
    }


    deleteArticle = (title, body, id, posterId) => {

      console.log(this.state.articles, "before deleting");

      console.log(title, body, id, posterId, 'delete Article function working');

      let data = {
        "id": id,
        "title": title,
        "body": body,
        "posterId": posterId
      }
    
      let options = {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      }

      //this.state.articles.filter()

      fetch(this.state.Requests + 'article/' + id, options)
      .then((response) => {console.log(response);})
      .catch((error) => console.log(error))


      let articles = this.state.articles.filter(art => art.id !== Number(id));
      console.log(articles);
      //const articles = [...this.state.articles];
      this.setState({articles: articles/*, loaded: false*/});
    } 

    showComments = () => {
      console.log("Showing Comments");
      if (!this.state.commentVisible)
      {
        this.setState({commentVisible: true})
      }
      else
      {
        this.setState({commentVisible: false})
      }
    }

    render() {

      return (
        
        <div className="App">
          <div className="container">
            <BlogHeader ref={this.emailInputFiled}
              showLoginScreen = {this.showLoginScreen}
              showSigninScreen = {this.showSigninScreen}
              showArticlesNotLogged = {this.showArticlesNotLogged}
              showHeaderUserTools = {this.state.showHeaderUserTools}
              showHeaderWidget = {this.state.showHeaderWidget}
              showWelcomeMessage = {this.state.showWelcomeMessage}
              logUser= {this.logUser}
              showUserNameChange = {this.showUserNameChange}
              showUserPasswordChange = {this.showUserPasswordChange}
              loggedFirstName = {this.state.loggedFirstName}
              loggedLastName = {this.state.loggedLastName}
            >
            </BlogHeader>

            {
              this.state.showLogin ? (
              <BlogLogin
                showArticlesNotLogged = {this.showArticlesNotLogged}
                logUser = {this.logUser}
                showSigninScreen = {this.showSigninScreen}
                // getInpuValue ={this.getInpuValue}
              >
              </BlogLogin>) : null
            }

            {
              this.state.showSignin ? (
              <BlogSignin
                showArticlesNotLogged = {this.showArticlesNotLogged}
                addNewUser = {this.addNewUser}
                showLoginScreen = {this.showLoginScreen}
              >
              </BlogSignin>) : null
            }

            { this.state.showChangeUserData ? 
              (<ChangeUser
                cancelChangeUserDataForm = {this.cancelChangeUserDataForm} 
                changeBasicUserData = {this.changeBasicUserData}
                currentUserEmail = {this.state.currentUserEmail}
                currentUserFirstName = {this.state.currentUserFirstName}
                currentUserLastName = {this.state.currentUserLastName}
                handleCurrentUserEmailChange = {this.handleCurrentUserEmailChange}
                handleCurrentUserFirstNameChange = {this.handleCurrentUserFirstNameChange}
                handleCurrentUserLastNameChange = {this.handleCurrentUserLastNameChange}
               >

              </ChangeUser>) : null
            }

            { this.state.showChangeUserPassword ? 
              (<ChangePassword
                cancelChangeUserDataForm = {this.cancelChangeUserDataForm}
                changePassword = {this.changePassword}
                oldPassword = {this.state.oldPassword}
                newPassword = {this.state.newPassword}
                handleOldPasswordChange = {this.handleOldPasswordChange}
                handleNewPasswordChange = {this.handleNewPasswordChange}
               >

              </ChangePassword>) : null
            }

            {this.state.showEditModule ?
              (
                <EditModule
                  addNewArticle = {this.addNewArticle}
                  fillFormWithTitle = {this.fillFormWithTitle}
                  valueTitle = {this.state.valueTitle}
                  valueBody = {this.state.valueBody}
                  valueId = {this.state.valueId}
                  valuePosterId = {this.state.valuePosterId}
                  handleEditTitleChange = {this.handleEditTitleChange}
                  handleEditBodyChange = {this.handleEditBodyChange}
                  changeArticle = {this.changeArticle}
                >

                </EditModule>
              ) : null
            }
            {this.state.showArticles ?
              (
                <div className="articles_container">  
                  <Articles
                    articles = {this.state.articles}
                    loaded = {this.state.loaded}
                    showArticleEditButton = {this.state.showArticleEditButton}
                    showArticleDeleteButton = {this.state.showArticleDeleteButton}
                    currentPosterId = {this.state.posterId}
                    getTitleBody = {this.getTitleBody}
                    deleteArticle = {this.deleteArticle}
                    showCommentsEditButtons = {this.state.showCommentsEditButtons}
                    showPostCommentButton = {this.state.showPostCommentButton}
                    Requests = {this.state.Requests}
                  >
                  </Articles>
                </div>
              ) : null
            }

          </div>
        </div>
      )}
  }

  export default App;
