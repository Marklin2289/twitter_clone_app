import { dbService } from 'fbase';
import React, { useState } from 'react';

export default function Home() {
    const [tweet,setTweet] = useState("");

    const onSubmit = async(e) => {
        e.preventDefault();
        await dbService.collection("tweet").add({
            tweet: tweet,
            createdAt: Date.now()
        });
        setTweet("");
    }

    const onChange = (e) => {
        const {target: {value}} = e;
        setTweet(value);
        // console.log(value)
    }

    return (
        <div>
            <form onSubmit={onSubmit} >
                <input  value={tweet} onChange={onChange} type="text" placeholder="what's in your mind?" maxLength={120} />
                <input type="submit" value="tweet" />
            </form>
        </div>
    )
};
