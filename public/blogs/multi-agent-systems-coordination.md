# Multi-Agent Systems and Coordination

Multi-agent systems represent one of the most exciting frontiers in artificial intelligence and robotics. When multiple autonomous agents must work together to achieve common goals, new challenges and opportunities emerge that go beyond single-agent learning.

## Introduction

A **multi-agent system (MAS)** consists of multiple interacting agents in a shared environment. These agents might cooperate, compete, or both, leading to emergent behaviors that are greater than the sum of their parts.

### Real-World Applications

- **Warehouse Robotics**: Coordinating dozens of AMRs for package handling
- **Traffic Management**: Self-driving vehicles navigating intersections
- **Smart Grids**: Distributed energy management
- **Multi-Robot Exploration**: Coordinated mapping of unknown environments
- **Team Sports**: RoboCup soccer, drone racing teams

## Challenges in Multi-Agent Learning

### 1. Non-Stationarity

Each agent's policy changes during training, making the environment appear non-stationary from any single agent's perspective.

```python
# Agent A's perspective
# Environment transitions depend on Agent B's policy π_B
P(s'|s, a_A) = Σ_a_B π_B(a_B|s) P(s'|s, a_A, a_B)

# As π_B changes, the environment dynamics change!
```

### 2. Credit Assignment

When multiple agents contribute to an outcome, determining each agent's contribution is challenging.

```python
# Global reward r_global received
# How much credit does each agent deserve?
# agent_1: contributed 30%?
# agent_2: contributed 70%?
```

### 3. Scalability

The joint action space grows exponentially with the number of agents.

```
Single agent: |A| actions
N agents: |A|^N joint actions
```

### 4. Communication

How should agents share information? What to communicate? When?

## Coordination Mechanisms

### Centralized Training, Decentralized Execution (CTDE)

The dominant paradigm in MARL:

```python
class CTDEAgent:
    def __init__(self, agent_id, n_agents):
        # Centralized critic (training only)
        self.critic = CentralizedCritic(
            state_dim=global_state_dim,
            action_dim=n_agents * action_dim
        )

        # Decentralized actor (execution)
        self.actor = DecentralizedActor(
            obs_dim=local_obs_dim,
            action_dim=action_dim
        )

    def train(self, batch):
        """Training with global information"""
        global_states = batch['global_states']
        all_actions = batch['all_actions']

        # Critic uses full information
        value = self.critic(global_states, all_actions)

        # Actor only uses local observations
        policy_loss = self.compute_policy_loss(
            batch['local_obs'],
            batch['actions'],
            value
        )

        return policy_loss

    def act(self, local_obs):
        """Execution with only local information"""
        return self.actor(local_obs)
```

### Value Decomposition

Decompose team reward into individual value functions:

**VDN (Value Decomposition Networks)**:

```python
class VDN:
    def __init__(self, n_agents):
        self.agents = [QNetwork() for _ in range(n_agents)]

    def compute_joint_q(self, obs, actions):
        """Q_total = Σ Q_i(o_i, a_i)"""
        individual_q = [
            agent.q_network(obs[i], actions[i])
            for i, agent in enumerate(self.agents)
        ]
        return sum(individual_q)
```

**QMIX**:

```python
class QMIX:
    def __init__(self, n_agents):
        self.agents = [QNetwork() for _ in range(n_agents)]
        self.mixing_network = HyperNetwork()

    def compute_joint_q(self, obs, actions, state):
        """Non-linear mixing of individual Q-values"""
        individual_q = torch.stack([
            agent.q_network(obs[i], actions[i])
            for i, agent in enumerate(self.agents)
        ])

        # Mixing network ensures monotonicity
        # ∂Q_total/∂Q_i ≥ 0
        weights = self.mixing_network(state)
        joint_q = self.mix(individual_q, weights)

        return joint_q
```

## Communication Protocols

### CommNet: Learning to Communicate

```python
class CommNet(nn.Module):
    def __init__(self, n_agents, hidden_dim):
        super().__init__()
        self.n_agents = n_agents
        self.encoder = nn.Linear(obs_dim, hidden_dim)
        self.communication = nn.Linear(hidden_dim, hidden_dim)
        self.decoder = nn.Linear(hidden_dim, action_dim)

    def forward(self, observations):
        """
        observations: [n_agents, obs_dim]
        """
        # Encode local observations
        h = [self.encoder(obs) for obs in observations]

        # Communication rounds
        for _ in range(self.comm_rounds):
            # Average hidden states (broadcast communication)
            h_avg = torch.mean(torch.stack(h), dim=0)

            # Update each agent's hidden state
            h = [self.communication(h_i + h_avg) for h_i in h]

        # Decode to actions
        actions = [self.decoder(h_i) for h_i in h]
        return actions
```

### Targeted Communication

```python
class AttentionComm(nn.Module):
    def __init__(self, hidden_dim):
        super().__init__()
        self.query = nn.Linear(hidden_dim, hidden_dim)
        self.key = nn.Linear(hidden_dim, hidden_dim)
        self.value = nn.Linear(hidden_dim, hidden_dim)

    def forward(self, hidden_states):
        """Attention-based selective communication"""
        Q = self.query(hidden_states)
        K = self.key(hidden_states)
        V = self.value(hidden_states)

        # Compute attention weights
        attention = torch.softmax(
            Q @ K.T / np.sqrt(hidden_dim),
            dim=-1
        )

        # Weighted aggregation of messages
        messages = attention @ V

        return hidden_states + messages
```

## Game-Theoretic Foundations

### Nash Equilibrium

In competitive/mixed settings, agents seek Nash equilibria:

```python
def find_nash_equilibrium(game_matrix, n_iters=1000):
    """Fictitious play to approximate Nash equilibrium"""
    n_actions_1, n_actions_2 = game_matrix.shape

    # Initialize uniform strategies
    strategy_1 = np.ones(n_actions_1) / n_actions_1
    strategy_2 = np.ones(n_actions_2) / n_actions_2

    # Belief about opponent's strategy
    belief_1 = np.zeros(n_actions_2)
    belief_2 = np.zeros(n_actions_1)

    for t in range(n_iters):
        # Best response to belief
        action_1 = np.argmax(game_matrix @ belief_1)
        action_2 = np.argmax(game_matrix.T @ belief_2)

        # Update beliefs (average of observed actions)
        belief_1 = (t * belief_1 + action_2) / (t + 1)
        belief_2 = (t * belief_2 + action_1) / (t + 1)

        # Update strategies
        strategy_1 = belief_2
        strategy_2 = belief_1

    return strategy_1, strategy_2
```

### Pareto Optimality

For cooperative agents, seek Pareto optimal solutions:

```python
def is_pareto_optimal(payoff, all_payoffs):
    """Check if a payoff is Pareto optimal"""
    for other_payoff in all_payoffs:
        # If another payoff dominates this one
        if all(other_payoff >= payoff) and any(other_payoff > payoff):
            return False
    return True
```

## Advanced Algorithms

### MADDPG (Multi-Agent DDPG)

```python
class MADDPG:
    def __init__(self, n_agents):
        self.agents = []
        for i in range(n_agents):
            agent = {
                'actor': Actor(obs_dim, action_dim),
                'critic': Critic(n_agents * (obs_dim + action_dim)),
                'target_actor': Actor(obs_dim, action_dim),
                'target_critic': Critic(n_agents * (obs_dim + action_dim))
            }
            self.agents.append(agent)

    def update(self, batch):
        """Update all agents"""
        for i, agent in enumerate(self.agents):
            # Critic update (uses all agents' info)
            all_obs = batch['all_observations']
            all_actions = batch['all_actions']
            rewards = batch['rewards'][:, i]

            # Target actions from all agents
            target_actions = [
                self.agents[j]['target_actor'](all_obs[:, j])
                for j in range(len(self.agents))
            ]

            # TD target
            target_q = agent['target_critic'](
                all_obs.flatten(1),
                torch.cat(target_actions, dim=1)
            )
            td_target = rewards + self.gamma * target_q

            # Critic loss
            current_q = agent['critic'](
                all_obs.flatten(1),
                all_actions.flatten(1)
            )
            critic_loss = F.mse_loss(current_q, td_target)

            # Actor update (policy gradient)
            # Use current agent's actor, other agents' current policies
            actions = [
                self.agents[j]['actor'](all_obs[:, j]) if j == i
                else all_actions[:, j]
                for j in range(len(self.agents))
            ]

            actor_loss = -agent['critic'](
                all_obs.flatten(1),
                torch.cat(actions, dim=1)
            ).mean()
```

### COMA (Counterfactual Multi-Agent Policy Gradients)

```python
class COMA:
    def __init__(self, n_agents):
        self.actor = PolicyNetwork()
        self.critic = CentralizedCritic()

    def compute_advantage(self, state, actions, agent_id):
        """Counterfactual advantage"""
        # Q-value with actual action
        q_actual = self.critic(state, actions)

        # Expected Q over counterfactual actions
        q_counterfactual = 0
        for action in self.action_space:
            # Replace agent_id's action with counterfactual
            cf_actions = actions.copy()
            cf_actions[agent_id] = action

            q_cf = self.critic(state, cf_actions)
            prob = self.actor(state[agent_id])[action]
            q_counterfactual += prob * q_cf

        # Advantage = actual Q - baseline Q
        advantage = q_actual - q_counterfactual
        return advantage
```

## Emergent Behaviors

Multi-agent systems can exhibit fascinating emergent behaviors:

### Flocking

```python
def boid_update(position, velocity, neighbors):
    """Classic boids flocking behavior"""
    # Separation: avoid crowding
    separation = -sum(position - n.position
                     for n in neighbors if distance(position, n) < min_dist)

    # Alignment: steer towards average heading
    alignment = sum(n.velocity for n in neighbors) / len(neighbors)

    # Cohesion: steer towards average position
    cohesion = sum(n.position for n in neighbors) / len(neighbors) - position

    # Combine behaviors
    velocity += w_sep * separation + w_align * alignment + w_coh * cohesion
    position += velocity * dt

    return position, velocity
```

### Task Allocation

```python
class TaskAllocation:
    def __init__(self, n_agents, n_tasks):
        self.assignments = {}

    def auction_based_allocation(self, agents, tasks):
        """Market-based task allocation"""
        while tasks:
            # Each agent bids on tasks
            bids = {}
            for agent in agents:
                for task in tasks:
                    utility = agent.compute_utility(task)
                    bids[(agent, task)] = utility

            # Assign task to highest bidder
            (winner, task), value = max(bids.items(), key=lambda x: x[1])
            self.assignments[task] = winner
            tasks.remove(task)
            agents.remove(winner)
```

## Practical Implementation Tips

### Environment Design

```python
class MultiAgentEnv:
    def __init__(self, n_agents):
        self.n_agents = n_agents
        self.agents = [Agent(i) for i in range(n_agents)]

    def step(self, actions):
        """Execute joint action"""
        # Check for collisions
        positions = [agent.position for agent in self.agents]
        collisions = self.detect_collisions(positions)

        # Update each agent
        observations = []
        rewards = []
        dones = []

        for i, (agent, action) in enumerate(zip(self.agents, actions)):
            obs, reward, done = agent.step(action)

            # Penalize collisions
            if i in collisions:
                reward -= collision_penalty

            observations.append(obs)
            rewards.append(reward)
            dones.append(done)

        return observations, rewards, dones, {}
```

### Shared Experience Replay

```python
class SharedReplayBuffer:
    def __init__(self, capacity):
        self.buffer = deque(maxlen=capacity)

    def add(self, experience):
        """Add multi-agent experience tuple"""
        # (states, actions, rewards, next_states, dones)
        self.buffer.append(experience)

    def sample(self, batch_size):
        """Sample batch for training"""
        indices = np.random.choice(len(self.buffer), batch_size)
        batch = [self.buffer[i] for i in indices]

        # Stack experiences
        states = torch.stack([b[0] for b in batch])
        actions = torch.stack([b[1] for b in batch])
        # ...

        return states, actions, rewards, next_states, dones
```

## Evaluation Metrics

```python
def evaluate_coordination(agents, env, n_episodes=100):
    """Evaluate multi-agent coordination"""
    metrics = {
        'success_rate': 0,
        'avg_reward': 0,
        'collision_rate': 0,
        'communication_overhead': 0
    }

    for _ in range(n_episodes):
        obs = env.reset()
        done = False
        episode_reward = 0

        while not done:
            actions = [agent.act(obs[i]) for i, agent in enumerate(agents)]
            obs, rewards, done, info = env.step(actions)

            episode_reward += sum(rewards)
            metrics['collision_rate'] += info.get('collisions', 0)

        metrics['success_rate'] += info.get('success', 0)
        metrics['avg_reward'] += episode_reward

    # Normalize
    for key in metrics:
        metrics[key] /= n_episodes

    return metrics
```

## Future Directions

- **Lifelong Learning**: Continual adaptation to new teammates
- **Theory of Mind**: Modeling other agents' beliefs and intentions
- **Hierarchical Coordination**: Multi-level decision making
- **Heterogeneous Teams**: Agents with different capabilities
- **Large-Scale Systems**: Scaling to hundreds/thousands of agents

## Conclusion

Multi-agent reinforcement learning combines challenges from game theory, distributed systems, and machine learning. As robots and AI systems become more prevalent, the ability to coordinate multiple autonomous agents will be crucial for:

- Warehouse automation
- Autonomous transportation
- Disaster response
- Environmental monitoring
- Collaborative manufacturing

The field is rapidly evolving, with new algorithms and applications emerging constantly. Understanding these fundamentals provides a strong foundation for tackling real-world multi-agent challenges.

Coordinate and conquer! 🤖🤖🤖
