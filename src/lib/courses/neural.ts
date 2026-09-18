import type { Course } from "@/lib/types";

export const neural: Course = {
  id: "neural-networks",
  title: "How Neural Networks Learn",
  tagline: "From a single weighted sum to gradient descent, without the hand-waving.",
  icon: "🧠",
  accent: "from-orange-500 to-rose-500",
  level: "Intermediate",
  lessons: [
    {
      id: "perceptron",
      title: "The Artificial Neuron",
      blurb: "Multiply, add a bias, squash. Everything else is scale.",
      concept: [
        "A neuron computes z = w₁x₁ + w₂x₂ + … + b, then passes z through an activation function.",
        "The weights say how much each input matters; the bias shifts the decision boundary off the origin.",
        "Without a non-linear activation, stacking layers is pointless — a chain of linear maps is just another linear map.",
      ],
      problems: [
        {
          id: "nn-p-1",
          type: "numeric",
          prompt:
            "A neuron has weights w = [0.5, −1.5] and bias b = 1. Inputs are x = [4, 1]. What is z before activation?",
          visual: "neuron",
          answer: 1.5,
          tolerance: 0.01,
          hint: "z = w·x + b",
          explanation: "0.5 × 4 + (−1.5) × 1 + 1 = 2 − 1.5 + 1 = 1.5.",
        },
        {
          id: "nn-p-2",
          type: "mcq",
          prompt: "A ReLU activation is applied to z = −3.2. What comes out?",
          choices: [
            { id: "a", text: "−3.2" },
            { id: "b", text: "0" },
            { id: "c", text: "3.2" },
            { id: "d", text: "0.04" },
          ],
          answer: "b",
          explanation:
            "ReLU is max(0, z), so every negative input becomes 0. That is also why a neuron stuck at negative z stops learning — the “dying ReLU” problem.",
        },
        {
          id: "nn-p-3",
          type: "mcq",
          prompt: "Why must a deep network use non-linear activations between layers?",
          choices: [
            { id: "a", text: "To keep numbers small enough to store" },
            { id: "b", text: "Because stacked linear layers collapse into a single linear layer" },
            { id: "c", text: "To make backpropagation possible at all" },
            { id: "d", text: "To guarantee outputs sum to 1" },
          ],
          answer: "b",
          explanation:
            "Composing linear maps gives another linear map, so a hundred linear layers could be replaced by one. Non-linearity is what buys representational depth.",
        },
        {
          id: "nn-p-4",
          type: "slider",
          prompt:
            "A sigmoid activation is σ(z) = 1 / (1 + e^(−z)). What is σ(0), as a percentage?",
          min: 0,
          max: 100,
          step: 1,
          answer: 50,
          tolerance: 1.5,
          unit: "%",
          explanation:
            "σ(0) = 1/(1+1) = 0.5, i.e. 50%. The sigmoid is centred at zero and saturates toward 0 and 1 — which is exactly where its gradients vanish.",
        },
      ],
    },
    {
      id: "gradient-descent",
      title: "Gradient Descent",
      blurb: "Walk downhill on the loss surface. Step size decides whether you arrive.",
      concept: [
        "Training minimises a loss function. The gradient points in the direction of steepest increase, so we step against it.",
        "The update is w ← w − η · ∂L/∂w, where η is the learning rate.",
        "Too small an η crawls; too large overshoots and diverges. Most training failures are a learning-rate problem in disguise.",
      ],
      problems: [
        {
          id: "nn-gd-1",
          type: "numeric",
          prompt:
            "A weight is 0.8, the gradient of the loss with respect to it is 2.0, and the learning rate is 0.1. What is the updated weight?",
          answer: 0.6,
          tolerance: 0.01,
          hint: "w − η · gradient",
          explanation: "0.8 − 0.1 × 2.0 = 0.6. We move against the gradient because it points uphill.",
        },
        {
          id: "nn-gd-2",
          type: "mcq",
          prompt: "Training loss oscillates wildly and then explodes to NaN. The most likely cause is:",
          visual: "loss-curve",
          choices: [
            { id: "a", text: "The learning rate is too high" },
            { id: "b", text: "The learning rate is too low" },
            { id: "c", text: "The dataset is too large" },
            { id: "d", text: "Too few epochs" },
          ],
          answer: "a",
          explanation:
            "Overshooting the minimum makes each step land somewhere worse, and the loop amplifies until values overflow. Cutting η by 10× is the standard first move.",
        },
        {
          id: "nn-gd-3",
          type: "mcq",
          prompt: "What does a mini-batch buy you over full-batch gradient descent?",
          choices: [
            { id: "a", text: "An exactly correct gradient every step" },
            { id: "b", text: "Faster, noisier updates that often escape poor local minima" },
            { id: "c", text: "Guaranteed convergence in one epoch" },
            { id: "d", text: "No need for a learning rate" },
          ],
          answer: "b",
          explanation:
            "A mini-batch estimates the gradient from a sample: cheaper per step and noisy, and the noise itself helps escape sharp, bad regions of the loss surface.",
        },
        {
          id: "nn-gd-4",
          type: "multi",
          prompt: "Training loss keeps falling while validation loss rises. Which responses are reasonable?",
          choices: [
            { id: "a", text: "Stop early, at the validation minimum" },
            { id: "b", text: "Add regularisation or dropout" },
            { id: "c", text: "Train for many more epochs" },
            { id: "d", text: "Get more or more varied training data" },
          ],
          answer: ["a", "b", "d"],
          explanation:
            "That divergence is textbook overfitting. Early stopping, regularisation, and more data all address it; training longer makes it worse.",
        },
      ],
    },
  ],
};
