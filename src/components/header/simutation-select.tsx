import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx'
import { Button } from '@/components/ui/button.tsx'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx'
import { cn } from '@/lib/utils.ts'
import { useHighestGroupCondition } from '@/hooks/use-highest-group-condition.ts'
import { useSimulation } from '@/hooks/mcm/use-simulation.ts'

export default function SimulationSelect() {
  const highestCondition = useHighestGroupCondition()
  const { groups, setGroups } = useSimulation()

  if (highestCondition === undefined) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="min-w-[200px] justify-between">
          {groups === undefined || groups.length === 0 ? 'Simulation' : `Simulating ${groups.join(', ')}`}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Group Control" />
          <CommandEmpty>This group control is not in this page</CommandEmpty>
          <CommandGroup>
            {new Array(highestCondition).fill(null).map((_, index) => {
              const groupControl = index + 1

              return (
                <CommandItem
                  key={groupControl}
                  value={`${groupControl}`}
                  onSelect={() => {
                    if (groups?.includes(groupControl)) {
                      setGroups(groups.filter((g) => g !== groupControl))

                      return
                    }

                    setGroups([...(groups ?? []), groupControl].sort((a, b) => a - b))
                  }}
                >
                  <CheckIcon className={cn('mr-2 h-4 w-4', groups?.includes(groupControl) ? 'opacity-100' : 'opacity-0')} />
                  {groupControl}
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
