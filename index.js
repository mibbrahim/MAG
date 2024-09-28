import fs from 'fs';
import moment from 'moment';
import simpleGit from 'simple-git';
import random from 'random';

const git = simpleGit();
const filePath = './data.json';

async function makeCommits(times) {
  try {
    for (let i = 0; i < times; i++) {
      const weeksAgo = random.int(0, 52); // X (horizontal)
      const daysAgo = random.int(0, 6);   // Y (vertical)

      const date = moment()
        .subtract(weeksAgo, 'weeks')
        .subtract(daysAgo, 'days')
        .format("YYYY-MM-DDTHH:mm:ss");

      fs.writeFileSync(filePath, JSON.stringify({ date }));

      await git.add('./*');
      await git.commit(`Commit on ${date}`, { '--date': date });

      console.log(`✅ Commit ${i + 1}/${times} created at ${date}`);
    }

    await git.push('origin', 'main');
    console.log("🚀 All commits pushed to GitHub!");
  } catch (err) {
    console.error("❌ Error occurred:", err.message);
  }
}

// Call the function
makeCommits(100);

