import React from 'react';
import { connect } from "react-redux";
import { updatePlayer, removePlayer } from "../redux/actions/player"
import BackgroundSelector from "./BackgroundSelector";

class Player extends React.Component {

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  adjustLifeTotal = param => e => {
    const old_life = this.props.player.life_total
    const new_life = old_life + param
    const life_object = { old_life: this.props.player.life_total, life_event: param }
    this.props.dispatch(updatePlayer( this.props.player.id,
      {
        life_total: new_life,
        history: [...this.props.player.history, life_object]
      }
    ));
  };

  adjustPoisonCounters = param => e => {
    const old_life = this.props.player.poison_counters
    const new_life = old_life + param
    const life_object = { old_life: this.props.player.poison_counters+"*", life_event: param+"*" }
    this.props.dispatch(updatePlayer( this.props.player.id,
      {
        poison_counters: new_life,
        history: [...this.props.player.history, life_object]
      }
    ));
  };

  onNameChange = (e) => {
    this.props.dispatch(updatePlayer( this.props.player.id,
      { name: e.target.value }
    ));
  };

  removePlayer = (e) => {
    this.props.dispatch(removePlayer(this.props.player.id));
  }

  setBackground = (bgClass) => {
    console.log(bgClass);
    this.props.dispatch(updatePlayer( this.props.player.id,
      {
        background_class: "player background-pane "+bgClass
      }
    ));
  };

  render() {
    const history_list = this.props.player.history.map((history_step) =>
      <p>({history_step.old_life}) {history_step.life_event > 0 ? "+" : ""}{history_step.life_event}</p>
    );

    return (
        <div className={this.props.player.background_class}>
          <div className="mana large"></div>
          <div className="player_info">
            <input type="string" placeholder="player" className="player_name" value={this.props.player.name} onChange={this.onNameChange}/>
            <button onClick={this.removePlayer}>x</button>
            <h1>{this.props.player.life_total}</h1>
            <section className="life_buttons">
              <button onClick={this.adjustLifeTotal(-5)}>-5</button>
              <button onClick={this.adjustLifeTotal(-1)}>-1</button>
              <button onClick={this.adjustLifeTotal(1)}>+1</button>
              <button onClick={this.adjustLifeTotal(5)}>+5</button>
            </section>
            <section className="poison_buttons">
              <button onClick={this.adjustPoisonCounters(-1)}>-1</button>
              <span className="poison_count">{this.props.player.poison_counters}<span className="mana poison"></span></span>
              <button onClick={this.adjustPoisonCounters(1)}>+1</button>
            </section>
            <BackgroundSelector callbackToParent={this.setBackground} />
          </div>
          <section className="edh_damage">
            <div className="edh_player">
              <div className="edh_player-name">Gustrodamus</div>
              <div className="edh_player-dmg">
                <button>-1</button>
                <span className="edh_player-dmg-count">10</span>
                <button>+1</button>
              </div>
            </div>
            <div className="edh_player">
              <div className="edh_player-name">Gustrodamus</div>
              <div className="edh_player-dmg">
                <button>-1</button>
                <span className="edh_player-dmg-count">10</span>
                <button>+1</button>
              </div>
            </div>
          </section>
          <section className="player_log">{history_list.reverse()}</section>
        </div>
    )
  }
}

const mapStateToProps = state => {
  const reduxState = state;
  return { reduxState };
};

export default connect(mapStateToProps)(Player);