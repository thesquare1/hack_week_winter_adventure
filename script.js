// Story data model
const storyNodes = {
  start: {
    text: "You stand at the edge of a silent winter forest. Snow blankets the ground and your breath forms clouds in the cold air.",
    choices: [
      { label: "Follow mysterious footprints", next: "tracks" },
      { label: "Stay on the main path", next: "path" }
    ]
  },

  // TRACKS BRANCH
  tracks: {
    text: "You follow faint footprints that lead you to a frozen pond. A dark opening in the ice beckons beneath the snow.",
    choices: [
      { label: "Enter the ice cave", next: "caveEntrance" },
      { label: "Return to the forest edge", next: "lost" }
    ]
  },
  caveEntrance: {
    text: "Inside the cave, you see a glowing crystal pulsating with light and a friendly snow fox watching you curiously.",
    choices: [
      { label: "Take the glowing crystal", next: "crystal" },
      { label: "Follow the snow fox deeper", next: "foxGuide" }
    ]
  },
  crystal: {
    text: "You pocket the crystal. As its warmth spreads, the cave entrance trembles and seals behind you. At dawn, you find yourself home with a magical souvenir.",
    choices: []
  },
  foxGuide: {
    text: "The fox leads you through twisting ice tunnels to a hidden ice palace where the Snow Queen rewards your bravery with a gift of eternal warmth.",
    choices: []
  },

  // MAIN PATH BRANCH
  path: {
    text: "You stay on the main path and arrive at an old wooden cabin with smoke curling from its chimney.",
    choices: [
      { label: "Knock on the door", next: "cabin" },
      { label: "Keep walking past the cabin", next: "bear" }
    ]
  },
  cabin: {
    text: "An old hermit welcomes you with a steaming mug of tea by the hearth. The fire crackles warmly.",
    choices: [
      { label: "Share stories by the fire", next: "tea" },
      { label: "Ask the hermit for a map to the festival", next: "festival" }
    ]
  },
  tea: {
    text: "You and the hermit exchange tales of winter wonders until you drift to sleep. In the morning, the world is peaceful and bright.",
    choices: []
  },
  festival: {
    text: "The hermit unfurls a worn map showing a hidden winter festival in the valley. You set off together to celebrate joyous lights and music.",
    choices: []
  },

  // LOST FOREST BRANCH
  lost: {
    text: "You head back into the dark forest and quickly lose the trail. Stars peek through branches as the cold wind howls around you.",
    choices: [
      { label: "Build a warming fire", next: "fire" },
      { label: "Follow a distant star's glow", next: "star" }
    ]
  },
  fire: {
    text: "You gather twigs and kindle a fire. Its warmth guides rescue parties who find you safe at dawn.",
    choices: []
  },
  star: {
    text: "Guided by a shimmering star, you discover a hidden ice temple filled with ancient runes and a sense of wonder.",
    choices: []
  },

  // BEAR ENCOUNTER BRANCH
  bear: {
    text: "You pass the cabin and suddenly hear a roar. A massive bear emerges, blocking your path. Ahead looms a tall tree, and to the side a narrow river.",
    choices: [
      { label: "Climb the tree quickly", next: "tree" },
      { label: "Dash toward the river", next: "river" }
    ]
  },
  tree: {
    text: "You scramble up the tree just in time. From your vantage point, the bear wanders off, and at sunrise you climb down to safety.",
    choices: []
  },
  river: {
    text: "You sprint toward the river, slipping on ice and tumbling into the cold water. You struggle to shore but emerge shaken and determined.",
    choices: []
  }
};

// Render the story and choices for a given node ID
function renderNode(nodeId) {
  const node = storyNodes[nodeId];
  const storyDiv = document.getElementById('story');
  const choicesDiv = document.getElementById('choices');

  // Display story text with fade-in
  storyDiv.style.opacity = 0;
  setTimeout(() => {
    storyDiv.textContent = node.text;
    storyDiv.style.opacity = 1;
  }, 200);

  // Clear old choices
  choicesDiv.innerHTML = '';

  // If there are choices, show them
  if (node.choices.length) {
    node.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice.label;
      btn.addEventListener('click', () => renderNode(choice.next));
      btn.style.opacity = 0;
      choicesDiv.appendChild(btn);

      // Button fade-in
      setTimeout(() => {
        btn.style.animation = 'fadeIn 0.5s forwards';
      }, 300);
    });
  } else {
    // End of path
    const endMsg = document.createElement('p');
    endMsg.textContent = "--- The End ---";
    endMsg.style.textAlign = 'center';
    endMsg.style.marginTop = '20px';
    endMsg.style.fontWeight = '600';
    choicesDiv.appendChild(endMsg);
  }
}

// Snowflake animation generator
function createSnowflakes(count = 50) {
  for (let i = 0; i < count; i++) {
    const flake = document.createElement('div');
    flake.classList.add('snowflake');
    flake.textContent = '❄';
    const size = Math.random() * 12 + 8;
    flake.style.left = Math.random() * 100 + '%';
    flake.style.fontSize = size + 'px';
    flake.style.animationDuration = (Math.random() * 8 + 4) + 's';
    flake.style.animationDelay = Math.random() * 5 + 's';
    document.body.appendChild(flake);
  }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  createSnowflakes();
  renderNode('start');
});
