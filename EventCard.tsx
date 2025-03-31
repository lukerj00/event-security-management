import React, { useState, useEffect } from 'react';
import { Event } from '../types/event';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Shield, 
  AlertTriangle, 
  Banknote, 
  Tag, 
  History, 
  ChevronDown, 
  ChevronUp, 
  Brain, 
  AlertCircle, 
  Target, 
  Briefcase,
  AlertOctagon,
  Building,
  Bomb,
  Car,
  Sword,
  Beaker,
  Laptop,
  UserCog
} from 'lucide-react';
import { classifyEvent, assessEventRisk, getTargetAttractiveness } from '../utils/openai';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);
  const [isOperationalExpanded, setIsOperationalExpanded] = useState(false);
  const [isTargetExpanded, setIsTargetExpanded] = useState(false);
  const [isRiskExpanded, setIsRiskExpanded] = useState(false);
  const [eventTypes, setEventTypes] = useState({ mainType: event.event_type, subType: event.event_subtype });
  const [riskAssessment, setRiskAssessment] = useState<{
    riskLevel: string;
    categories: {
      category: string;
      risk: string;
      description: string;
    }[];
  }>({ riskLevel: "Pending", categories: [] });
  const [targetAttractiveness, setTargetAttractiveness] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getEventTypes = async () => {
      setIsLoading(true);
      try {
        const types = await classifyEvent(event.event_description);
        setEventTypes(types);
        
        const risk = await assessEventRisk({
          event_type: event.event_type,
          location: event.location,
          event_size: event.event_size,
          venue_type: event.venue_type,
          duration_days: event.duration_days,
          crowd_demographics: event.crowd_demographics,
          historical_incidents: event.historical_incidents,
          security_level: event.security_level,
          time_of_year: event.time_of_year,
          event_description: event.event_description,
        });
        setRiskAssessment(risk);

        const attractiveness = await getTargetAttractiveness({
          event_type: event.event_type,
          location: event.location,
          event_size: event.event_size,
          venue_type: event.venue_type,
          duration_days: event.duration_days,
          crowd_demographics: event.crowd_demographics,
          historical_incidents: event.historical_incidents,
          security_level: event.security_level,
          time_of_year: event.time_of_year,
          event_description: event.event_description,
          event_id: event.event_id
        });
        setTargetAttractiveness(attractiveness);
      } catch (error) {
        console.error('Failed to process event:', error);
        setEventTypes({ mainType: event.event_type, subType: event.event_subtype });
        setRiskAssessment({ riskLevel: "Error", categories: [] });
        setTargetAttractiveness("Error analyzing target attractiveness.");
      } finally {
        setIsLoading(false);
      }
    };

    getEventTypes();
  }, [event]);

  const getRiskColor = (risk: string): string => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Person-Borne IED (PBIED)':
        return <Bomb className="w-5 h-5" />;
      case 'Vehicle-Borne IED (VBIED)':
        return <Car className="w-5 h-5" />;
      case 'Vehicle as a Weapon (VAW)':
        return <Car className="w-5 h-5" />;
      case 'Marauding Terrorist Attack (MTA)':
        return <Sword className="w-5 h-5" />;
      case 'Fire as a Weapon (FAW)':
        return <AlertTriangle className="w-5 h-5" />;
      case 'Chemical/Biological, Radiological Attack (CBR)':
        return <Beaker className="w-5 h-5" />;
      case 'Cyber Attack':
        return <Laptop className="w-5 h-5" />;
      case 'Insider Threat':
        return <UserCog className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white">{event.event_name}</h1>
            <div className="mt-2 space-y-1">
              {event.event_description.map((line, index) => (
                <p key={index} className="text-blue-100 text-sm">{line}</p>
              ))}
            </div>
            <div className="flex items-center mt-3 text-blue-100">
              <MapPin className="w-4 h-4 mr-2" />
              <p>{event.location}</p>
            </div>
            <div className="flex flex-col mt-2 text-blue-100">
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <p className="text-blue-200 text-sm">Main Event Type:</p>
                <p className="ml-2">
                  {isLoading ? (
                    <span className="inline-block w-24 h-4 bg-blue-300/30 animate-pulse rounded"></span>
                  ) : (
                    eventTypes.mainType
                  )}
                </p>
              </div>
              <div className="flex items-center mt-1 ml-6">
                <p className="text-blue-200 text-sm">Event Type:</p>
                <p className="ml-2">
                  {isLoading ? (
                    <span className="inline-block w-24 h-4 bg-blue-300/30 animate-pulse rounded"></span>
                  ) : (
                    eventTypes.subType
                  )}
                </p>
              </div>
              <div className="flex items-center mt-2">
                <Brain className="w-4 h-4 mr-2" />
                <p className="text-blue-200 text-sm">EVIL DONE Assessment:</p>
                <div className="ml-2 px-3 py-1 rounded">
                  {isLoading ? (
                    <span className="inline-block w-32 h-4 bg-blue-300/30 animate-pulse rounded"></span>
                  ) : (
                    <span className={`font-medium px-2 py-1 rounded ${getRiskColor(riskAssessment.riskLevel)}`}>
                      {riskAssessment.riskLevel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full font-bold ${
            event.event_details.security_category === 'CAT A' ? 'bg-red-500 text-white' :
            event.event_details.security_category === 'CAT B' ? 'bg-yellow-500 text-black' :
            'bg-green-500 text-white'
          }`}>
            {event.event_details.security_category}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Event Details Section */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
            className="w-full p-4 bg-blue-50 flex justify-between items-center hover:bg-blue-100 transition-colors"
          >
            <h2 className="text-xl font-semibold text-blue-900">Event Details</h2>
            {isDetailsExpanded ? (
              <ChevronUp className="w-5 h-5 text-blue-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-600" />
            )}
          </button>
          
          {isDetailsExpanded && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Basic Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                      <span>Duration: {event.duration_days} day(s)</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-3 text-blue-600" />
                      <span>Capacity: {event.event_details.capacity}</span>
                    </div>
                    <div className="flex items-center">
                      <Banknote className="w-5 h-5 mr-3 text-blue-600" />
                      <span>Ticket Price: {event.event_details.cost}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-4">Security Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 mr-3 text-red-600" />
                      <span>Security Level: {event.security_level}</span>
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-3 text-red-600" />
                      <span>Historical Incidents: {event.historical_incidents}</span>
                    </div>
                    <div>
                      <p className="font-medium">Demographics: {event.crowd_demographics}</p>
                      <p className="font-medium">Venue Type: {event.venue_type}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Schedule</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-3 text-green-600" />
                      <div>
                        <p>Doors Open: {event.event_schedule.doors_open}</p>
                        <p>Support Act: {event.event_schedule.support_act}</p>
                        <p>Main Act: {event.event_schedule.main_act}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-3 text-purple-600" />
                      <span>{event.contact_information.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-purple-600" />
                      <span>{event.contact_information.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Security History Section */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
            className="w-full p-4 bg-amber-50 flex justify-between items-center hover:bg-amber-100 transition-colors"
          >
            <div className="flex items-center">
              <History className="w-6 h-6 mr-2 text-amber-600" />
              <h2 className="text-xl font-semibold text-amber-900">Historical Security Analysis</h2>
            </div>
            {isHistoryExpanded ? (
              <ChevronUp className="w-5 h-5 text-amber-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-amber-600" />
            )}
          </button>

          {isHistoryExpanded && (
            <div className="p-6 bg-amber-50">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Previous Events</h3>
                  <ul className="list-disc list-inside space-y-1 text-amber-900">
                    {event.security_history.previous_events.map((prev, index) => (
                      <li key={index}>{prev}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Security Performance</h3>
                  <p className="text-amber-900">{event.security_history.security_performance}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Reported Incidents</h3>
                  <ul className="list-disc list-inside space-y-1 text-amber-900">
                    {event.security_history.reported_incidents.map((incident, index) => (
                      <li key={index}>{incident}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Lessons Learned</h3>
                  <ul className="list-disc list-inside space-y-1 text-amber-900">
                    {event.security_history.lessons_learned.map((lesson, index) => (
                      <li key={index}>{lesson}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Operational Context Section */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setIsOperationalExpanded(!isOperationalExpanded)}
            className="w-full p-4 bg-indigo-50 flex justify-between items-center hover:bg-indigo-100 transition-colors"
          >
            <div className="flex items-center">
              <Briefcase className="w-6 h-6 mr-2 text-indigo-600" />
              <h2 className="text-xl font-semibold text-indigo-900">Operational Context</h2>
            </div>
            {isOperationalExpanded ? (
              <ChevronUp className="w-5 h-5 text-indigo-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-indigo-600" />
            )}
          </button>

          {isOperationalExpanded && (
            <div className="p-6 bg-indigo-50">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-indigo-800 mb-2">Event Characteristics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-indigo-700 mb-2">Venue Details</h4>
                      <ul className="space-y-2 text-indigo-900">
                        <li>Type: {event.venue_type}</li>
                        <li>Location: {event.location}</li>
                        <li>Capacity: {event.event_details.capacity}</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-indigo-700 mb-2">Temporal Factors</h4>
                      <ul className="space-y-2 text-indigo-900">
                        <li>Duration: {event.duration_days} day(s)</li>
                        <li>Season: {event.time_of_year}</li>
                        <li>Weather: {event.weather_conditions}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-indigo-800 mb-2">Security Considerations</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-indigo-700 mb-2">Access Control</h4>
                      <ul className="list-disc list-inside text-indigo-900">
                        <li>Security Category: {event.event_details.security_category}</li>
                        <li>Security Level: {event.security_level}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-indigo-700 mb-2">Crowd Management</h4>
                      <ul className="list-disc list-inside text-indigo-900">
                        <li>Expected Attendance: {event.event_size}</li>
                        <li>Demographics: {event.crowd_demographics}</li>
                        <li>Historical Incidents: {event.historical_incidents}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Target Attractiveness Section */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setIsTargetExpanded(!isTargetExpanded)}
            className="w-full p-4 bg-rose-50 flex justify-between items-center hover:bg-rose-100 transition-colors"
          >
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 mr-2 text-rose-600" />
              <h2 className="text-xl font-semibold text-rose-900">Target Attractiveness</h2>
            </div>
            {isTargetExpanded ? (
              <ChevronUp className="w-5 h-5 text-rose-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-rose-600" />
            )}
          </button>

          {isTargetExpanded && (
            <div className="p-6 bg-rose-50">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                {isLoading ? (
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-rose-100 rounded w-3/4"></div>
                    <div className="h-4 bg-rose-100 rounded w-5/6"></div>
                    <div className="h-4 bg-rose-100 rounded w-2/3"></div>
                  </div>
                ) : (
                  <div className="prose prose-rose max-w-none">
                    <p className="text-rose-900 whitespace-pre-line">{targetAttractiveness}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Risk Assessment Section */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setIsRiskExpanded(!isRiskExpanded)}
            className="w-full p-4 bg-rose-50 flex justify-between items-center hover:bg-rose-100 transition-colors"
          >
            <div className="flex items-center">
              <Target className="w-6 h-6 mr-2 text-rose-600" />
              <h2 className="text-xl font-semibold text-rose-900">Risk Assessment</h2>
            </div>
            {isRiskExpanded ? (
              <ChevronUp className="w-5 h-5 text-rose-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-rose-600" />
            )}
          </button>

          {isRiskExpanded && (
            <div className="p-6 bg-rose-50">
              <div className="space-y-6">
                {/* Risk Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {riskAssessment.categories.map((category, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`p-2 rounded-full ${getRiskColor(category.risk)}`}>
                          {getCategoryIcon(category.category)}
                        </div>
                        <h3 className="font-semibold text-rose-900">{category.category}</h3>
                      </div>
                      <div className={`inline-block px-2 py-1 rounded text-sm font-medium mb-2 ${getRiskColor(category.risk)}`}>
                        {category.risk} Risk
                      </div>
                      <p className="text-rose-900 text-sm">{category.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}