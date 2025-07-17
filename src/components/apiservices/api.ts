const BASE_URL = 'https://pyx-masterdata-serivce-gedha7bja3awbbey.canadacentral-01.azurewebsites.net/api/agents';

const handleResponse = async (res: Response) => {
  if (!res.ok) throw new Error('Request failed');
  return res.json();
};

const mapArray = (arr?: any[]) => arr?.map((item: any) => item.value) ?? [];
const wrapArray = (arr?: string[]) => arr?.map((item: string) => ({ value: item })) ?? [];

const transformAgentResponse = (agent: any) => ({
  ...agent,
  tags: mapArray(agent.tags),
  features: mapArray(agent.features),
  integrations: mapArray(agent.integrations),
  isActive: agent.active,
  isNew: agent.new,
  isPremium: agent.premium,
});

export async function fetchAgentsPaginated({ page = 0, size = 20, sort = [] }: {
  page?: number;
  size?: number;
  sort?: string[];
} = {}) {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  sort.forEach(s => params.append('sort', s));

  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  return handleResponse(res);
}

export async function createAgent(agent: any) {
  const payload = {
    ...agent,
    tags: wrapArray(agent.tags),
    features: wrapArray(agent.features),
    integrations: wrapArray(agent.integrations),
  };
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function fetchAgentById(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`);
  const agent = await handleResponse(res);
  return transformAgentResponse(agent);
}

export async function deleteAgentById(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete agent');
  return true;
}

export async function updateAgentById(id: string, agent: any) {
  const payload = {
    ...agent,
    tags: wrapArray(agent.tags),
    features: wrapArray(agent.features),
    integrations: wrapArray(agent.integrations),
  };

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const updated = await handleResponse(res);
  return transformAgentResponse(updated);
}

export async function fetchAgentDetailById(id: string) {
  const res = await fetch(`${BASE_URL}/${id}/detail`);
  const detail = await handleResponse(res);

  return {
    ...transformAgentResponse(detail),
    howitWorks: detail.howItWorks?.map((step: any) => ({
      id: step.stepNumber,
      title: step.title,
      description: step.description,
    })) ?? [],
    features: detail.features ? detail.features.map((f: any) => f.value || f) : [],
    reviewsList: detail.reviewsList ?? [],
  };
}

export async function fetchAgentCards() {
  const res = await fetch(`${BASE_URL}/cards`);
  const cards = await handleResponse(res);
  return cards.map(transformAgentResponse);
}
