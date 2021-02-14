import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

export default function Home({userObj}) {
    const [tweet,setTweet] = useState("");
    const [tweets,setTweets] = useState([]);

    

    useEffect(() => {
        
        dbService.collection("tweet").onSnapshot(snapshot => {
            const tweetArray = snapshot.docs.map(doc=> ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        });
    },[]);

    const onSubmit = async(e) => {
        e.preventDefault();
        await dbService.collection("tweet").add({
            // tweet,
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setTweet("");
    }

    const onChange = (e) => {
        const {target: {value}} = e;
        setTweet(value);
        // console.log(value)
    }
    // console.log(tweets)
    return (
        <div>
            <form onSubmit={onSubmit} >
                <input  value={tweet} onChange={onChange} type="text" placeholder="what's in your mind?" maxLength={120} />
                <input type="submit" value="tweet" />
            </form>
            <div>
                {tweets.map((tweet, idx)=> (
                <div key={idx}>
                    <h4>{tweet.text}</h4>
                </div>
                ))}
            </div>
        </div>
    )
};
