const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

type ApiResponse<T = unknown> = {
  data?: T;
  error?: string;
  success: boolean;
};

export interface ThreatData {
  date: string;
  total: number;
  web: number;
  network: number;
}

export interface HourlyData {
  hour: string;
  incidents: number;
  resolved: number;
}

export interface RiskCategory {
  name: string;
  value: number;
  color: string;
}

export interface PerformanceMetrics {
  metric: string;
  current: number;
  previous: number;
  trend: 'up' | 'down';
  unit?: string;
}

export const threatApi = {
  /**
   * Fetch threat trends data
   */
  async getThreatTrends(days: number = 7): Promise<ApiResponse<ThreatData[]>> {
    try {
      // In a real implementation, this would be an actual API call
      // const response = await fetch(`${API_BASE_URL}/threats/trends?days=${days}`, {
      //   credentials: 'include',
      // });
      // if (!response.ok) throw new Error('Failed to fetch threat trends');
      // return await response.json();
      
      // Mock data - replace with actual API call
      const now = new Date();
      const mockData: ThreatData[] = Array.from({ length: days }, (_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (days - i - 1));
        const total = Math.floor(Math.random() * 50) + 20;
        const web = Math.floor(Math.random() * (total * 0.7));
        return {
          date: date.toISOString().split('T')[0],
          total,
          web,
          network: total - web,
        };
      });
      
      return { success: true, data: mockData };
    } catch (error) {
      console.error('Error fetching threat trends:', error);
      return { success: false, error: 'Failed to fetch threat trends' };
    }
  },

  /**
   * Fetch hourly incident data
   */
  async getHourlyData(): Promise<ApiResponse<HourlyData[]>> {
    try {
      // Mock data - replace with actual API call
      const mockData: HourlyData[] = Array.from({ length: 6 }, (_, i) => ({
        hour: `${i * 4}`.padStart(2, '0') + ':00',
        incidents: Math.floor(Math.random() * 20) + 5,
        resolved: Math.floor(Math.random() * 15) + 3,
      }));
      
      return { success: true, data: mockData };
    } catch (error) {
      console.error('Error fetching hourly data:', error);
      return { success: false, error: 'Failed to fetch hourly data' };
    }
  },

  /**
   * Fetch risk distribution data
   */
  async getRiskDistribution(): Promise<ApiResponse<RiskCategory[]>> {
    try {
      // Mock data - replace with actual API call
      const mockData: RiskCategory[] = [
        { name: "Critical", value: Math.floor(Math.random() * 20) + 5, color: "#ef4444" },
        { name: "High", value: Math.floor(Math.random() * 30) + 10, color: "#f97316" },
        { name: "Medium", value: Math.floor(Math.random() * 40) + 20, color: "#eab308" },
        { name: "Low", value: Math.floor(Math.random() * 25) + 5, color: "#10b981" },
      ];
      
      return { success: true, data: mockData };
    } catch (error) {
      console.error('Error fetching risk distribution:', error);
      return { success: false, error: 'Failed to fetch risk distribution' };
    }
  },

  /**
   * Fetch performance metrics
   */
  async getPerformanceMetrics(): Promise<ApiResponse<PerformanceMetrics[]>> {
    try {
      // Mock data - replace with actual API call
      const mockData: PerformanceMetrics[] = [
        { 
          metric: "Detection Rate", 
          current: 90 + Math.random() * 10, 
          previous: 85 + Math.random() * 10, 
          trend: Math.random() > 0.3 ? 'up' : 'down',
          unit: '%'
        },
        { 
          metric: "Response Time", 
          current: 1 + Math.random() * 3, 
          previous: 2 + Math.random() * 3, 
          trend: Math.random() > 0.5 ? 'down' : 'up',
          unit: 'min'
        },
        { 
          metric: "False Positives", 
          current: 1 + Math.random() * 5, 
          previous: 3 + Math.random() * 5, 
          trend: Math.random() > 0.3 ? 'down' : 'up',
          unit: '%'
        },
        { 
          metric: "System Uptime", 
          current: 99.5 + Math.random() * 0.5, 
          previous: 99 + Math.random() * 1, 
          trend: Math.random() > 0.2 ? 'up' : 'down',
          unit: '%'
        },
      ];
      
      return { success: true, data: mockData };
    } catch (error) {
      console.error('Error fetching performance metrics:', error);
      return { success: false, error: 'Failed to fetch performance metrics' };
    }
  }
};
