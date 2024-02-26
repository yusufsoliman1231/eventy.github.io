export function formatDate(dateString: string | undefined): string {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  const now = new Date();

  // Check if the date is today
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  // Check if the date is yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  // Otherwise, format the date as "MM/DD/YYYY"
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
