export function getInitials(name: string): string {
    const parts = name.split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    } else if (parts.length === 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    } else {
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
  }
  
  export function getColorFromInitials(initials: string): string {
    const colors = [
      '#007bff', '#28a745', '#dc3545', '#9f7803', '#17a2b8',
      '#6c757d', '#6610f2', '#e83e8c', '#fd7e14', '#20c997'
    ];
  
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
      hash = initials.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash % colors.length);
    return colors[colorIndex];
  }
  