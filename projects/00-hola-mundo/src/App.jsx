import './App.css';
import { TwitterFollowCard  } from './TwitterFollowCard';

export function App() {

    // No es la mejor práctica, se usa cuando se necesita pasar muchas props
    const elonmusk = {
        userName: 'elonmusk',
        name: "Elon Musk",
        isFollowing: true
    }

    const users = [
        { userName: 'midudev', name: "Miguel Ángel Durán", isFollowing: true },
        { userName: 'pheralb', name: "Pablo Hernandez", isFollowing: false },
        elonmusk,
        { userName: 'vanderhart', name: "Vanderhart", isFollowing: false }
    ]

    return (
        <section className='App'>
            {
                users.map(user => {
                    const { userName, name, isFollowing } = user
                    return (
                        <TwitterFollowCard
                            key={userName}
                            userName={userName}
                            initialIsFollowing={isFollowing}
                        >
                            {name}
                        </TwitterFollowCard>
                    )
                })
            }
        </section>
    );
}