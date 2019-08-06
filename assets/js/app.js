import React, { Component } from 'react'
import mp_js from 'micropython'

class App extends Component {
    state = {
        c: '0',
        f: '0',
        mp_ready: false,
    }

    async componentDidMount() {
        await mp_js
        // init is idempotent so it's safe to call multiple times
        await mp_js.init(64 * 1024)
        await mp_js.init_python(64 * 1024)
        this.setState({ mp_ready: true })
    }

    ctof = async c => {
        if (this.state.mp_ready && c && !isNaN(c)) {
            window.current_c = c
            console.log('calculating from c:', c)
            const stdout = await mp_js.do_str(`print('%.2f' % ((float(JS('current_c')) * 9 / 5) + 32))`)
            console.log('calculated f:', stdout)
            return stdout.trim()
        } else {
            return ''
        }
    }

    ftoc = async f => {
        if (this.state.mp_ready && f && !isNaN(f)) {
            window.current_f = f
            console.log('calculating from f:', f)
            const stdout = await mp_js.do_str(`print('%.2f' % ((float(JS('current_f')) - 32) * 5 / 9))`)
            console.log('calculated c:', stdout)
            return stdout.trim()
        } else {
            return ''
        }
    }

    onChangeC = async e => {
        const c = e.target.value
        this.setState({ c: c, f: await this.ctof(c) })
    }

    onChangeF = async e => {
        const f = e.target.value
        this.setState({ f: f, c: await this.ftoc(f) })
    }

    render() {
        return (
            <>
                <h1>Python in the brower!</h1>
                <p>Micropython is <span>
                    {this.state.mp_ready ? 'ready' : 'not ready'}
                </span>.</p>
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