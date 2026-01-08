# Deep Dive into Reinforcement Learning

Reinforcement Learning (RL) has revolutionized artificial intelligence, enabling agents to learn optimal behaviors through interaction with their environment. From AlphaGo's historic victories to autonomous vehicles, RL is at the forefront of AI innovation.

## Introduction

Unlike supervised learning where we have labeled data, or unsupervised learning where we discover patterns, reinforcement learning is about learning from **rewards and punishments**. An agent takes actions in an environment and receives feedback in the form of rewards, learning to maximize cumulative reward over time.

## The RL Framework

### Markov Decision Process (MDP)

The mathematical foundation of RL is the Markov Decision Process, defined by:

- **S**: Set of states
- **A**: Set of actions
- **P**: Transition probability P(s'|s,a)
- **R**: Reward function R(s,a,s')
- **γ**: Discount factor (0 ≤ γ ≤ 1)

```python
class Environment:
    def __init__(self):
        self.state = self.reset()

    def reset(self):
        """Reset environment to initial state"""
        return initial_state

    def step(self, action):
        """Take action and return (next_state, reward, done, info)"""
        next_state = self.transition(self.state, action)
        reward = self.get_reward(self.state, action, next_state)
        done = self.is_terminal(next_state)
        self.state = next_state
        return next_state, reward, done, {}
```

### The Agent-Environment Loop

```
┌─────────┐
│  Agent  │
└────┬────┘
     │ Action (At)
     ▼
┌─────────┐
│  Env    │
└────┬────┘
     │ State (St+1), Reward (Rt+1)
     ▼
```

## Key Concepts

### Value Functions

**State Value Function V(s)**: Expected return starting from state s

```python
V(s) = E[Rt + γRt+1 + γ²Rt+2 + ... | St = s]
```

**Action Value Function Q(s,a)**: Expected return starting from state s, taking action a

```python
Q(s,a) = E[Rt + γRt+1 + γ²Rt+2 + ... | St = s, At = a]
```

### Bellman Equations

The foundation of many RL algorithms:

```python
# Bellman Expectation Equation
V(s) = Σa π(a|s) Σs',r p(s',r|s,a)[r + γV(s')]

# Bellman Optimality Equation
V*(s) = maxa Σs',r p(s',r|s,a)[r + γV*(s')]
```

## Classical RL Algorithms

### Q-Learning (Off-Policy TD Control)

```python
class QLearning:
    def __init__(self, n_states, n_actions, alpha=0.1, gamma=0.99, epsilon=0.1):
        self.Q = np.zeros((n_states, n_actions))
        self.alpha = alpha  # learning rate
        self.gamma = gamma  # discount factor
        self.epsilon = epsilon  # exploration rate

    def get_action(self, state):
        """Epsilon-greedy policy"""
        if np.random.random() < self.epsilon:
            return np.random.randint(self.Q.shape[1])
        return np.argmax(self.Q[state])

    def update(self, state, action, reward, next_state):
        """Q-learning update rule"""
        best_next_action = np.argmax(self.Q[next_state])
        td_target = reward + self.gamma * self.Q[next_state, best_next_action]
        td_error = td_target - self.Q[state, action]
        self.Q[state, action] += self.alpha * td_error
```

### SARSA (On-Policy TD Control)

```python
def sarsa_update(self, state, action, reward, next_state, next_action):
    """SARSA update - uses actual next action"""
    td_target = reward + self.gamma * self.Q[next_state, next_action]
    td_error = td_target - self.Q[state, action]
    self.Q[state, action] += self.alpha * td_error
```

## Deep Reinforcement Learning

### Deep Q-Network (DQN)

Combining Q-Learning with deep neural networks:

```python
import torch
import torch.nn as nn

class DQN(nn.Module):
    def __init__(self, state_dim, action_dim, hidden_dim=128):
        super(DQN, self).__init__()
        self.network = nn.Sequential(
            nn.Linear(state_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, action_dim)
        )

    def forward(self, state):
        return self.network(state)

class DQNAgent:
    def __init__(self, state_dim, action_dim):
        self.q_network = DQN(state_dim, action_dim)
        self.target_network = DQN(state_dim, action_dim)
        self.target_network.load_state_dict(self.q_network.state_dict())
        self.optimizer = torch.optim.Adam(self.q_network.parameters(), lr=1e-3)
        self.memory = ReplayBuffer(capacity=10000)

    def train(self, batch_size=32):
        if len(self.memory) < batch_size:
            return

        batch = self.memory.sample(batch_size)
        states, actions, rewards, next_states, dones = batch

        # Compute current Q values
        current_q = self.q_network(states).gather(1, actions)

        # Compute target Q values
        with torch.no_grad():
            next_q = self.target_network(next_states).max(1)[0]
            target_q = rewards + (1 - dones) * self.gamma * next_q

        # Compute loss and update
        loss = nn.MSELoss()(current_q.squeeze(), target_q)
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()
```

### Policy Gradient Methods

**REINFORCE Algorithm**:

```python
class PolicyNetwork(nn.Module):
    def __init__(self, state_dim, action_dim):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(state_dim, 128),
            nn.ReLU(),
            nn.Linear(128, action_dim),
            nn.Softmax(dim=-1)
        )

    def forward(self, state):
        return self.network(state)

def reinforce_update(policy, episode_rewards, episode_log_probs, gamma=0.99):
    """REINFORCE policy gradient update"""
    returns = []
    G = 0
    for r in reversed(episode_rewards):
        G = r + gamma * G
        returns.insert(0, G)

    returns = torch.tensor(returns)
    returns = (returns - returns.mean()) / (returns.std() + 1e-9)

    policy_loss = []
    for log_prob, R in zip(episode_log_probs, returns):
        policy_loss.append(-log_prob * R)

    policy_loss = torch.cat(policy_loss).sum()

    optimizer.zero_grad()
    policy_loss.backward()
    optimizer.step()
```

## Modern Deep RL Algorithms

### Proximal Policy Optimization (PPO)

PPO has become one of the most popular RL algorithms due to its stability and sample efficiency:

```python
def ppo_update(policy, old_policy, states, actions, advantages, epsilon=0.2):
    """PPO clipped objective"""
    # Compute probability ratio
    new_probs = policy(states).gather(1, actions)
    old_probs = old_policy(states).gather(1, actions).detach()
    ratio = new_probs / old_probs

    # Clipped surrogate objective
    clipped_ratio = torch.clamp(ratio, 1-epsilon, 1+epsilon)
    surrogate1 = ratio * advantages
    surrogate2 = clipped_ratio * advantages
    policy_loss = -torch.min(surrogate1, surrogate2).mean()

    return policy_loss
```

### Soft Actor-Critic (SAC)

State-of-the-art off-policy algorithm for continuous control:

```python
class SAC:
    def __init__(self, state_dim, action_dim):
        self.actor = PolicyNetwork(state_dim, action_dim)
        self.critic1 = QNetwork(state_dim, action_dim)
        self.critic2 = QNetwork(state_dim, action_dim)
        self.alpha = 0.2  # temperature parameter

    def select_action(self, state):
        """Sample action from policy"""
        mean, log_std = self.actor(state)
        std = log_std.exp()
        normal = torch.distributions.Normal(mean, std)
        action = normal.rsample()
        return torch.tanh(action)

    def update(self, batch):
        """SAC update step"""
        states, actions, rewards, next_states, dones = batch

        # Update critics
        with torch.no_grad():
            next_actions, next_log_probs = self.actor.sample(next_states)
            target_q1 = self.target_critic1(next_states, next_actions)
            target_q2 = self.target_critic2(next_states, next_actions)
            target_q = torch.min(target_q1, target_q2) - self.alpha * next_log_probs
            target_q = rewards + (1 - dones) * self.gamma * target_q

        # Update actor
        new_actions, log_probs = self.actor.sample(states)
        q1 = self.critic1(states, new_actions)
        q2 = self.critic2(states, new_actions)
        actor_loss = (self.alpha * log_probs - torch.min(q1, q2)).mean()
```

## Exploration Strategies

### Epsilon-Greedy

```python
def epsilon_greedy(Q, state, epsilon):
    if np.random.random() < epsilon:
        return np.random.randint(len(Q[state]))
    return np.argmax(Q[state])
```

### Upper Confidence Bound (UCB)

```python
def ucb_action(counts, values, c=2):
    total_counts = sum(counts)
    ucb_values = values + c * np.sqrt(np.log(total_counts) / (counts + 1e-5))
    return np.argmax(ucb_values)
```

### Entropy Regularization

```python
policy_loss = -(log_probs * advantages).mean() - entropy_coef * entropy.mean()
```

## Practical Considerations

### Reward Shaping

Carefully design rewards to guide learning:

```python
def shaped_reward(state, action, next_state):
    # Task reward
    task_reward = get_task_reward(next_state)

    # Shaping reward (potential-based)
    potential_current = state.distance_to_goal
    potential_next = next_state.distance_to_goal
    shaping = gamma * potential_next - potential_current

    return task_reward + shaping
```

### Curriculum Learning

Gradually increase task difficulty:

```python
class CurriculumEnv:
    def __init__(self):
        self.difficulty = 0

    def increase_difficulty(self, agent_performance):
        if agent_performance > 0.8:
            self.difficulty = min(self.difficulty + 1, max_difficulty)
```

## Challenges in RL

1. **Sample Efficiency**: RL often requires millions of interactions
2. **Credit Assignment**: Determining which actions led to rewards
3. **Exploration vs Exploitation**: Balancing learning and performance
4. **Stability**: Deep RL can be unstable and sensitive to hyperparameters
5. **Sparse Rewards**: Learning with infrequent feedback signals

## Applications

- **Game Playing**: AlphaGo, Dota 2, StarCraft II
- **Robotics**: Manipulation, locomotion, navigation
- **Autonomous Vehicles**: Path planning, control
- **Finance**: Trading, portfolio optimization
- **Healthcare**: Treatment optimization, drug discovery

## Conclusion

Reinforcement learning represents a fundamental paradigm for artificial intelligence, enabling agents to learn from experience. While challenges remain, recent advances in deep RL have demonstrated superhuman performance across diverse domains.

The field continues to evolve rapidly, with active research in:
- Model-based RL for sample efficiency
- Multi-agent RL for coordination
- Offline RL for learning from datasets
- Meta-RL for fast adaptation

Understanding these fundamentals provides a strong foundation for exploring cutting-edge RL research and applications.

Keep exploring, keep learning! 🤖
