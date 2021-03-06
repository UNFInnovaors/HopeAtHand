import React, { Component } from 'react';
import CreateSmartComponent from './Containers/CreateLessonPlan/CreateSmart';
import LessonPLanSmartContainer from './Containers/LessonPlanSearch/LessonPLanSmartContainer'
import UploadFileSmartContainer from './Containers/UploadFileSmartContainer/UploadFileSmartContainer'
import Admin from './Containers/Admin/AdminSmart'
import LogIn from './Containers/LogInForm/LoginSmartContainer'
import CreateTheme from './Containers/CreateTheme/CreateTheme'
import Search from './Containers/PrimarySearchComponent/SearchSmartContainer'
import { Route, Redirect } from 'react-router-dom'
import Filler from './components/HOC/Filler';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {Paper} from '@material-ui/core'
import {post} from './components/Axios/Instances'
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/green'
import AppBar from './components/AppBar/AppBar'
import LessonPlanViewer from './Containers/LessonPlanView/LessonPLanViewSmartContainer'
import ChangePasswordForm from './Containers/ChangePasswordForm/ChangePassword'

let theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  },
});


export default class App extends Component {
  displayName = App.name;
  
  state = {
    Theme: theme,
    UserName : null,
    Role:"",
    Favorites:{
      art:[],
      lessonplans:[],
      writing:[],
      poem:[]
    },
    ChangePassword: "No",
    Invalid: "Initial"
  }
  
  componentDidMount(){
    let themez = createMuiTheme({
      palette: {
        primary: blue,
        secondary: pink
      },
      typography:{
        body1:{
          fontSize: 16
        }
      }
    });
    this.setState({Theme:themez})
  }

  PasswordChanged = () => {
    this.setState({ChangePassword: "No"})
  }

  AddFavorites = (documentId) => {
    //console.log('This is AddFavorites!!!!!!!!!!!!!!!', documentId)

    let AddFavoritesDTO = {
      DocumentId: documentId,
      Username: this.state.UserName
    }

    post('/Favorites/AddFavorite', AddFavoritesDTO).then( res => {
      
    })
  }

  Login = (username, password) => {
    //console.log('This is the username in login', username)
    const LoginDTO = {
      Username: username,
      Password: password
    }
    
    post('/user/Login', LoginDTO).then( res => {
      //console.log(res, 'recieved user data')
      const FavoriteFindDTO = {
        username : LoginDTO.Username
      }
      if(res.data === "Not Found"){
        this.setState({Invalid: true})
      } else {
        //console.log('This is res', res)
        sessionStorage.setItem("token", res.data.token)
        post('/Favorites/GetFavorites', FavoriteFindDTO).then(res2 => {
          //console.log(res2)
          sessionStorage.setItem("token", res.data.token)
          this.setState({Favorites: res2.data,
                         UserName: username, 
                         Role: res.data.role, 
                         LoginError: false, 
                         LoggedIn: true,
                         ChangePassword: res.data.changePassword,
                         Authorized: true,
                         Invalid: false})
        })
      }
    }).catch( err => this.setState({Invalid: true}))
  }

  LogOut = () => {
    this.setState({UserName : null})
  }

  ChangeSecondary = (event) => {
    let themez = JSON.parse(JSON.stringify(this.state.Theme))
    //console.log('this is themez', themez, event.target.value, themez.palette.primary)
    let newTheme = createMuiTheme({
      palette:{
        primary: 
          themez.palette.primary,
        
        secondary:{ 
          main: event.target.value
          }
      }
    })
    this.setState({Theme:newTheme})
  }
  
  ChangePrimary =(event) => {
    let themez = JSON.parse(JSON.stringify(this.state.Theme))
    //console.log('this is themez', themez, event.target.value, themez.palette.primary)
    let newTheme = createMuiTheme({
      palette:{
        primary: { 
          main: event.target.value
          },
          secondary:themez.palette.primary
      }
    })
    this.setState({Theme:newTheme})
  }

  render() {
    //console.log(this.state, 'this is state in appjs')
    if(this.state.UserName === null) //
    {
      return (
        <Filler>
          <MuiThemeProvider theme={this.state.Theme}>
          <Paper  style={{height : '100%', paddingBottom:'5%'}}>
            <AppBar  LoggedIn ={this.state.UserName} favorites={this.state.Favorites} role={this.state.Role}/>
            <LogIn login={this.Login} Invalid={this.state.Invalid}/>
          </Paper>
          </MuiThemeProvider>
        </Filler>
      )
    } else {
      if(this.state.ChangePassword === 'Yes'){
        return (
        <MuiThemeProvider theme={this.state.Theme}>
          <Paper  style={{height : '100%', paddingBottom:'5%'}}>
            <AppBar logOut={this.LogOut} LoggedIn={null} favorites={this.state.Favorites} role={this.state.Role}/>
            <ChangePasswordForm email={this.state.UserName} PasswordChanged={this.PasswordChanged}/>
          </Paper>
        </MuiThemeProvider>
        )}
        else if(this.state.Role === "Facilitator"){
          return(
          <Filler>
            <MuiThemeProvider theme={this.state.Theme}>
              <Paper  style={{height : '100%', paddingBottom:'5%'}}>
                <AppBar logOut={this.LogOut} LoggedIn ={this.state.UserName} favorites={this.state.Favorites} role={this.state.Role}/>
                
                <Route path="/" exact render={(props) => 
                     <Search
                      user={this.state.UserName}
                      addFavorites={this.AddFavorites}
                     />
                }/>
                
                <Route path="/Search" exact render={(props) => 
                <Search
                      user={this.state.UserName}
                      addFavorites={this.AddFavorites}
                      />}/>
                <Route path="/Theme" exact render={(props) => 
                  <CreateTheme
                      user={this.state.UserName}
                      addFavorites={this.AddFavorites}/>}/>
              </Paper>
            </MuiThemeProvider>
          </Filler>
          )
        } else if(this.state.Role ==="Creating Facilitator"){
          return(
          <Filler>
            <MuiThemeProvider theme={this.state.Theme}>
              <Paper  style={{height : '100%', paddingBottom:'5%'}}>
                <AppBar logOut={this.LogOut} LoggedIn ={this.state.UserName} favorites={this.state.Favorites} role={this.state.Role}/>
                
                <Route path="/" exact render={(props) => 
                    <Search
                      user={this.state.UserName}
                      addFavorites={this.AddFavorites}
                    />
                }/>
                <Route path="/Create" exact render={(props) => 
                    <CreateSmartComponent
                      user={this.state.UserName}
                      addFavorites={this.AddFavorites}
                      />
                }/>
    
                <Route path="/Search" exact render={(props) => 
                <Search
                      user={this.state.UserName}
                      addFavorites={this.AddFavorites}
                      />}/>
                <Route path="/Upload" exact render={(props) => 
                  <UploadFileSmartContainer
                      user={this.state.UserName} 
                      addFavorites={this.AddFavorites}/>}>
                </Route>
                <Route path="/Theme" exact render={(props) => 
                  <CreateTheme
                      user={this.state.UserName}
                      addFavorites={this.AddFavorites}/>}/>
                <Route path='/test' exact render={(props) => <LessonPlanViewer/>}/>
              </Paper>
            </MuiThemeProvider>
          </Filler>
          )
        } else if(this.state.Role === "Administrator"){
          return (
            <Filler>
              <MuiThemeProvider theme={this.state.Theme}>
                <Paper  style={{height : '100%', paddingBottom:'5%'}}>
                  <AppBar logOut={this.LogOut} LoggedIn ={this.state.UserName} favorites={this.state.Favorites} role={this.state.Role}/>
                  
                  <Route path="/" exact render={(props) => 
                      <CreateSmartComponent
                        user={this.state.UserName}
                        addFavorites={this.AddFavorites}
                      />
                  }/>
                  <Route path="/Create" exact render={(props) => 
                      <CreateSmartComponent
                        user={this.state.UserName}
                        addFavorites={this.AddFavorites}
                        />
                  }/>
      
                  <Route path="/Search" exact render={(props) => 
                   <Search
                        user={this.state.UserName}
                        addFavorites={this.AddFavorites}
                        />}/>
                  <Route path="/Upload" exact render={(props) => 
                    <UploadFileSmartContainer
                        user={this.state.UserName} 
                        addFavorites={this.AddFavorites}/>}>
                  </Route>
                  <Route path="/Admin" exact render={(props) => 
                    <Admin
                        user={this.state.UserName}
                        addFavorites={this.AddFavorites}/>}>
                  </Route>
                  <Route path="/Theme" exact render={(props) => 
                    <CreateTheme
                        user={this.state.UserName}
                        addFavorites={this.AddFavorites}/>}/>
                  <Route path='/test' exact render={(props) => <LessonPlanViewer/>}/>
                </Paper>
              </MuiThemeProvider>
            </Filler>)
        } else {
          return (
            <Filler>
              <MuiThemeProvider theme={this.state.Theme}>
              <Paper  style={{height : '100%', paddingBottom:'5%'}}>
                <AppBar  LoggedIn ={this.state.UserName} favorites={this.state.Favorites} role={this.state.Role}/>
                <LogIn login={this.Login} Invalid={this.state.Invalid}/>
              </Paper>
              </MuiThemeProvider>
            </Filler>
          )
        }
  }
}
/*</Filler>
<Route path="" render={(props) => <Redirect to="/"/>}> </Route>
state = {
  SelectArrayProps: [
    'Select a Theme',
    'Female Empowerment',
    'Male Empowerment'
  ],
  Theme:null,
  QuestionProps: [
    { QAsked: 'Should Not Be Empty', validation: '', type: '' }
  ],

  BaseQuestion: { QAsked: '', validation: '', type: '' }
};

GetTheOptionHandler = event => {
  console.log('this is the event of the handler you just set up', event);
  this.setState({ [event.target.name]: event.target.value });
};
ChangePrimary = (event) => {

}

            <Route path="/Search" exact render={(props) => 
              <LessonPLanSmartContainer
                  user={this.state.UserName}
                  addFavorites={this.AddFavorites}
                  />}>
            </Route>

GetQuestionValueHandler = event => {
  let newQuestion = JSON.parse(JSON.stringify(this.state.BaseQuestion));
  newQuestion.QAsked = event.target.value;
  newQuestion.validation = 'Num';
  newQuestion.type = 'number';
  let collectionOfQuestions = JSON.parse(
    JSON.stringify(this.state.QuestionProps)
  );
  collectionOfQuestions.push(newQuestion);
  this.setState({ QuestionProps: collectionOfQuestions });
  console.log('this is the question you just typed in', newQuestion);
};

render() {
  let something = <div />;
  if (this.state.QuestionProps.length > 0) {
    something = this.state.QuestionProps.map((localName, index) => {
      return <ReuseableQuestion key={index} questionMetaData={localName} />;
    });
  }
}
}
//onClick={this.GetQuestionValueHandler}
*/
}