export const api = 'http://localhost:5000/';

export async function GetData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

export async function PostData(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to post data');
  return res.json();
}

export async function PatchData(url, data) {
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to patch data');
  return res.json();
}

export async function PutData(url, data) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update data');
  return res.json();
}

export async function DeleteData(url) {
  const res = await fetch(url, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete data');
  return res.json();
}


export function getUserMeta(user) {
  return {
    frinds: user?.frinds || [],
    isFrind: (targetUserId) => (user?.frinds || []).some(f => f?.id == targetUserId )
  };
}
