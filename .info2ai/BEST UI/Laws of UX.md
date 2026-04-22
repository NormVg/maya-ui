Every interface I've ever used that felt right had something in common, they always respect how I actually think. Not how a spec says I should think, but how my brain actually works. Deeper reasearch revels that there's a bunch of psychology behind this.
Researchers have been studying it for decades. In this post, I'm not going to cover all of it, just the laws I find myself coming back to the most and find the most useful to keep in mind when building interfaces.
Fitts's Law

The time required to move to a target is a function of the target's size and distance from the starting point.1

The bigger something is, the easier it is to click. This one is pretty obvious, but it's something that's easy to overlook when building.
2 / 12Fitts's Law Experiment
The experiment above should prove the above statement. It's pretty easy to hit something that's larger. But when you're dealing with small targets, you need to be more precise. This matters a lot when you're building. Always think about the hit area of your interactive elements.
Toast40 x 40Cross LargeToast72 x 72Checkmark 1ShowHit Areas
Above I'm using ::before to expand the hit area of a button. The user can't see the extra padding, but it's there and it's easy to click. Every pixel of padding on a button is a usability decision. Make the things people need to click easy to click.
Sidenote, this concept can also be seen somewhat in games. In platformers, there's a trick called "coyote time" where the game lets you jump for a few frames after you've already walked off a ledge. You're technically in the air, but the game pretends you're still on solid ground.
Coyote Time - Celeste2
Same principle as expanding a button's hit area. Instead of making a spatial target bigger, you're making a temporal target bigger. The user doesn't notice the forgiveness. They just feel like the system works.
Hick's Law

The time it takes to make a decision increases with the number and complexity of choices.3

More options, more cognitive load. And it's not linear, it's logarithmic. Going from 2 to 4 choices is noticeable. Going from 8 to 16 is painful.
StartHick's Law Experiment
Finding a word among 4 options is easy. Now try it with 24, each printed in the wrong color. That hesitation you feel is Hick's Law.
This doesn't mean you should always minimize choices. Sometimes people need options. The key is progressive disclosure. Show what matters now, reveal complexity when it's needed.
Restaurant menus understand this intuitively. The best ones don't list 200 dishes. They curate what you think should be seen. Your interface should too.
Miller's Law

The average person can hold about 7 (plus or minus 2) items in working memory at any given time.4

Whenever you're dealing with a lot of data, you need to chunk it or group it in a way that makes sense to the user. Showing them blobs of text is the worst thing you can do. It's like trying to find a needle in a haystack of junk.
RawPhone415-867-5309Card4532 0151 1283 0366Social123-45-6789SerialAX7B-2K9M-4RCurrency$1,234,567,890.00Raw vs. Readable
The raw data is identical to the chunked version. Your brain processes them completely differently. Chunking isn't a nice-to-have, I think it's a cognitive necessity.
Doherty Threshold

Productivity soars when a computer and its users interact at a pace that ensures neither has to wait on the other. The threshold is 400 milliseconds.5

Under 400ms, interactions feel instant. Above it, you notice. Way above it, you start wondering if something broke.
SaveInstant (<100ms)SaveThreshold (<400ms)SaveBroken (>2000ms)Click each button to feel the difference.
The 100ms response feels like the button is an extension of your hand. 400ms is barely noticeable. 2000ms feels broken, even though it does exactly the same thing.
If you can't make something fast, make it feel fast. Optimistic UI, skeleton screens, progress indicators, they all exist because perceived speed matters as much as actual speed. The best interactions are the ones where you never think about speed at all.
Postel's Law

Be conservative in what you send, be liberal in what you accept.6

This was originally a networking principle from RFC 761, but it translates perfectly to interface design. Your inputs should accept messy human data and normalize it into clean output.
Saturday, April 18, 2026Try entering dates in any format.
Users don't think in formats. They think in meaning. When someone types "jan 15 2024" they mean the same thing as "2024-01-15". Your interface should understand that.
The more formats you accept, the less friction people experience. Validate generously, format strictly.
Looking Back
I keep coming back to these laws because they're not really about interfaces. They're about how people work. How we perceive time, how we make decisions, how much we can hold in our heads at once.
You don't need to memorize any of this. Just pay attention to how things feel when you use them. At the end of the day, the hardest thing to do is make something feel easy, and that's what were trying to achieve.
If you want to dive deeper into all of this, check out Laws of UX by Jon Yablonski. It covers way more than what I've touched on here.



Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology, 47(6), 381-391. ↩


Game Maker's Toolkit, Why Does Celeste Feel So Good to Play?. Full video covering Celeste's controls, animation, and forgiveness mechanics. ↩


Hick, W. E. (1952). On the rate of gain of information. Quarterly Journal of Experimental Psychology, 4(1), 11-26. ↩


Miller, G. A. (1956). The magical number seven, plus or minus two. Psychological Review, 63(2), 81-97. ↩


Doherty, W. J., & Kelisky, R. P. (1979). Managing VM/CMS systems for user effectiveness. IBM Systems Journal, 18(1), 143-163. ↩


Jon Postel's original principle from RFC 761, applied to interface design. See also Postel's Law on Laws of UX. ↩


