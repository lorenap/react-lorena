import React from 'react';
import * as ReactBootstrap from 'react-bootstrap'
import $ from "jquery";
import ReactDOM from 'react-dom';
import './index.css';

	var Panel = ReactBootstrap.Panel, Accordion = ReactBootstrap.Accordion;
	var Button = ReactBootstrap.Button, InputGroup = ReactBootstrap.InputGroup;
	var ButtonToolbar = ReactBootstrap.ButtonToolbar;
	var Modal = ReactBootstrap.Modal;
	var ListGroup = ReactBootstrap.ListGroup, ListGroupItem = ReactBootstrap.ListGroupItem;

	var recipes = typeof localStorage["recipeBook"] !== "undefined" ? JSON.parse(localStorage["recipeBook"]) : [{ title: "Torta de frango", ingredients: ["Frango desfiado", "Palmito", "Farinha de trigo", "Manteiga"] }, { title: "Costelinha", ingredients: ["Carne de porco", "Suco de limão"] }],
		globalTitle = "",
		globalIngredients = []; 
		
	var createReactClass = require('create-react-class');


// Lista todas as receitas
var RecipeBook = createReactClass({
  render: function() {
    return (
      <div id = 'div-example'>
        <Accordion id = 'accordion-example'>	
            {this.props.data}         
        </Accordion>
      </div>
    );
  }
});

// Botões e título da receita
var Recipe = createReactClass({
  remove: function() {
    recipes.splice(this.props.index, 1);
    update();
  },
  edit: function() {
    globalTitle = this.props.title;
    globalIngredients = this.props.ingredients;
    document.getElementById("show").click();
  },
  render: function() {
    return (
      <div>
        <h4 className="text-center">Ingredientes da receita</h4><hr/>
        <IngredientList ingredients={this.props.ingredients} />
        <ButtonToolbar>
          <Button className="delete" bsStyle="danger" id={"btn-del"+this.props.index} onClick={this.remove}>Excluir</Button>
          <Button bsStyle="default" id={"btn-edit"+this.props.index} onClick={this.edit}>Editar</Button>
        </ButtonToolbar>
      </div>
    );
  }
});

// Lista os ingredientes das receitas
var IngredientList = createReactClass({
  render: function() {
    var ingredientList = this.props.ingredients.map(function(ingredient) {
      return (
        <ListGroupItem key={ingredient.toString()}>
          {ingredient}
        </ListGroupItem>
      );
    });
    return (
      <ListGroup>
      {ingredientList}
      </ListGroup>
    );
  },
});

//Modal and Add button
var RecipeAdd = createReactClass({
  getInitialState: function() {
    return { showModal: false };
  },
  
  close: function() {
    globalTitle = "";
    globalIngredients = [];
    this.setState({ showModal: false });
  },
  
  open: function() {
    this.setState({ showModal: true });
    if (document.getElementById("title") && document.getElementById("ingredients")) {
      $("#title").val(globalTitle);
      $("#ingredients").val(globalIngredients);
      if (globalTitle !== "") {
        $("#modalTitle").text("Editar");
        $("#addButton").text("Editar");
      }
    }
    else requestAnimationFrame(this.open);
  },
  
  add: function() {
    var title = document.getElementById("title").value;
    var ingredients = document.getElementById("ingredients").value.split(",");
    var exists = false;
	
    for (var i = 0; i < recipes.length; i++) {
      if (recipes[i].title === title) {
        recipes[i].ingredients = ingredients;
        exists = true;
        break;
      }
    }
	
    if (!exists) {
      if (title.length < 1) title = "Sem título";
		recipes.push({title: title, ingredients: document.getElementById("ingredients").value.split(",")});
    }
	
    update();
    this.close();
  },
  render: function() {
    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
          id="show">
          Adicionar Receita
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title id="modalTitle">Adicione uma receita</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <input className="form-control" type="text" label="Receita" placeholder="Receita" id="title" />
              <input className="form-control" type="textarea" label="Ingredientes" placeholder="Digite os ingredientes separados por vírgula" id="ingredients"/>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.add} bsStyle="primary" id="addButton">Adicionar</Button>
            <Button onClick={this.close}>Fechar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

// Monta todas as receitas já cadastradas
function update() {
  localStorage.setItem("recipeBook", JSON.stringify(recipes));
  var rows = [];
  for (var i=0; i < recipes.length; i++) {
    rows.push(
      <Panel eventKey={i} bsStyle="info">
		<Panel.Heading>
			<Panel.Title toggle>{recipes[i].title}</Panel.Title>
		</Panel.Heading>
		<Panel.Body collapsible>
			<Recipe title={recipes[i].title} ingredients={recipes[i].ingredients} index={i}/>
		 </Panel.Body>
      </Panel>
    );
  }
  ReactDOM.render(<RecipeBook data={rows}/>, document.getElementById("container"));
}

update(); 
ReactDOM.render(<RecipeAdd/>, document.getElementById("button"));




