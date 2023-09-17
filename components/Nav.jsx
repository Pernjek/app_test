import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    // only show nav when logged in
    if (!user) return null;

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <NavLink href="/game" exact className="nav-item nav-link">GAME</NavLink>
                <NavLink href="/highscore" className="nav-item nav-link">HIGHSCORE</NavLink>
                <button onClick={userService.logout} className="btn btn-link nav-item nav-link">LOGOUT</button>
            </div>
        </nav>
    );
}