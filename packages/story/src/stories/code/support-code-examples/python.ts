import { dedent } from "ts-dedent";

export const python = dedent`
import gym

# Create the environment
env = gym.make('CartPole-v1')

# Set up the agent
def policy(observation):
    position, velocity, angle, angle_velocity = observation
    action = 0 if angle < 0 else 1
    return action

# Train the agent
total_reward = 0
observation = env.reset()
for i in range(200):
    action = policy(observation)
    observation, reward, done, info = env.step(action)
    total_reward += reward
    if done:
        break

print(f'Total reward: {total_reward}')
`;
