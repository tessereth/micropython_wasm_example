import React, { Component } from 'react'

class App extends Component {
    state = {
        c: 0,
        f: 0,
    }
    onChangeC = e => {
        this.setState({ c: e.target.value })
    }

    onChangeF = e => {
        this.setState({ f: e.target.value })
        console.log(e)
    }

    render() {
        return (
            <>
                <h1>Python in the brower!</h1>
                <form>
                    <div>
                        <label>Degrees C</label>
                        <input name="degrees_c" value={this.state.c} onChange={this.onChangeC} type="number" />
                    </div>
                    <div>
                        <label>Degrees F</label>
                        <input name="degrees_f" value={this.state.f} onChange={this.onChangeF} type="number" />
                    </div>
                </form>
            </>
        )
    }
}

export default App